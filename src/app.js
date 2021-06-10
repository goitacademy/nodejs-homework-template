const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const path = require("path");
require("dotenv").config();
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS;

const { HttpCode } = require("./helpers/constants");
const { ErrorHandler } = require("./helpers/errorHandler");

const { apiLimit, jsonLimit } = require("./config/rate-limit.json");

const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const apiLimiter = rateLimit({
  windowMs: apiLimit.windowMs,
  max: apiLimit.max,
  handler: (req, res, next) => {
    next(
      new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `Too many requests. Please, try again later!`
      )
    );
  },
});

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static(path.join(__dirname, AVATAR_OF_USERS)));
app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

app.use("/api", apiLimiter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/contacts`,
    data: "Not Found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: err.status === 500 ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
