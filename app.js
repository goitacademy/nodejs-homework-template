const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("./config/config-passport");

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Use api on routes: /api",
    data: "Not found",
    status: "error",
    code: 404,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: err.message,
    status: "fail",
    code: 500,
    data: "Internal Server Error",
  });
});

module.exports = app;
