const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const code = err.code || 500;
  const status = err.status || "fail";
  const message = err.message || "error";
  res.status(code).json({ status, code, message: message });
});

module.exports = app;
