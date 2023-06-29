const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

require("dotenv").config({ path: "./.env" });
const { auth } = require("./auth/auth.js");

const contactsRouter = require("./routes/api/contacts.js");
const usersRouter = require("./routes/api/users.js");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", usersRouter);
app.use("/public", express.static("public"));

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, status: err.status });
});

module.exports = app;