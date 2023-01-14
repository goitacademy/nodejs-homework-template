const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");
const { invalid } = require("joi");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // tell express to work with JSON in body

// routes
app.use("/api/contacts", contactsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handling
app.use((err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.message.includes("Cast to ObjectId failed for value")) {
    return res.status(400).json({ message: "id is invalid" });
  }

  console.error("API Error", err.message, err.type);
  res.status(500).json({ message: err.message });
});

module.exports = app;
