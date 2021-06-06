const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const path = require("path");

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

require("dotenv").config();
const AVATAR_OF_USERS = path.join(process.cwd(), process.env.AVATAR_OF_USERS);

app.use(logger(formatsLogger));
app.use(express.static(path.join((__dirname, AVATAR_OF_USERS))));
app.use(cors());
app.use(express.json());
app.use(boolParser());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((err, _req, res, _next) => {
  const code = err.code || 404;
  const status = err.status || "error";
  const message = err.message || "error";
  res.status(code).json({ status, code, message: message });
});

app.use((err, _req, res, _next) => {
  const code = err.code || 500;
  const status = err.status || "fail";
  const message = err.message || "error";
  res.status(code).json({ status, code, message: message });
});

module.exports = app;
