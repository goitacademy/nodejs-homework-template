const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { HttpCode } = require("./src/helpers/constants");
const { ErrorHandler } = require("./src/helpers/errorHandler");

const { apiLimit, jsonLimit } = require("./src/config/rate-limit.json");
const contactsRouter = require("./src/api/contacts");
const usersRouter = require("./src/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

app.use(
  "/api/",
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,
    handler: (req, res, nexy) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          "Вы исчерпали количество запросов за 15 минут"
        )
      );
    },
  })
);
app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found route",
    data: "Not Found",
  });
});

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  const isInternalError = err.status === HttpCode.INTERNAL_SERVER_ERROR;

  res.status(err.status).json({
    status: isInternalError ? "fail" : "error",
    code: err.status,
    message: err.message,
    data: isInternalError ? "Internal Server Error" : err.data,
  });
});

module.exports = app;
