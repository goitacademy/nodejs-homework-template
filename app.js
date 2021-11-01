const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");

const contactsRouter = require("./routes/contacts/contacts");
const usersRouter = require("./routes/users/users");
const RareLimits = require("./config/constants");
const { HttpCode } = require("./config/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: RareLimits.JSON_LIMIT }));
app.use(boolParser());

app.use((req, res, next) => {
  // установ глобальную переменную
  app.set("lang", req.acceptsLanguages(["en", "ru"]));
  next();
});
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found!",
  });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

module.exports = app;
