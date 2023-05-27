const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { contactsRouter } = require("./routes/contactsRouter");
const { usersRouter } = require("./routes/usersRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong, please try again later",
  });
});

module.exports = app;
