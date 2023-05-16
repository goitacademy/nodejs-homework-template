/** @format */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error("Errors:", err.message, err.name);
  if (err.message.includes('E11000 duplicate key error collection')) {
    res.status(409).json({ message: "Already exist" });
  }

  if (err.message.includes("Cast to ObjectId failed")) {
    res.status(400).json({ message: "ID is not valid" });
  }
  if (err.name === "ValidationError") {
    res.status(400).json({ message: err.message });
  }

  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
