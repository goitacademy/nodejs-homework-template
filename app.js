const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { authRouter, usersRouter, contactsRouter } = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});
app.use((err, req, res, next) => {
  console.log(err.status);
  res
    .status(err.status || 500)
    .json({ status: "error", code: err.status || 500, message: err.message });
});

module.exports = app;

// "name": "Petro",
// "email": "Petro@1.ua",
// "password": "petro123456"

// "name": "Bogdan",
// "email": "Bogdan@1.ua",
// "password": "bogdan123456"
