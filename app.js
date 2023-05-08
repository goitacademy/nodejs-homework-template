const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./routes/api/contacts.js");
const authRouter = require("./routes/api/auth.js");
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);
app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, data: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.message.includes("E11000 duplicate key error")) {
    return res.status(409).json({
      message: "Email in use",
    });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.name,
    });
  }
  if (err.message.includes("Unauthorized")) {
    return res.status(401).json({
      message: "Email or password is wrong",
    });
  }
  if (
    err.message.includes("Token type is not valid") ||
    err.message.includes("No token provided") ||
    err.message.includes("JWT token is not valid")||
    err.message.includes("User not found")||
    err.message.includes("Token mismatch")
  ) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    data: "Internal Server Error",
  });
});

module.exports = app;
