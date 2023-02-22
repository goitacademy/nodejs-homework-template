// importing mongoose
const mongoose = require("mongoose");

// importing dotenv. this package delivers .env vars values to process.env
const dotenv = require("dotenv");

// reading .env
dotenv.config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  // giving default value to status (500) and message (server error) of coming error
  // if it's not status 404 which we throw manually - it will be always 500
  const { status = 500, message = "server error" } = err;
  res.status(status).json({ message: message });
});

module.exports = app;
