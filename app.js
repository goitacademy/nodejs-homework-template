const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
mongoose.connection.on("connected", function () {
  console.log("Database connection successful");
});
mongoose.connection.on("error", function () {
  console.log("error");
  process.exit(1);
});
const connection = mongoose.connect(process.env.DATABASE_URL);

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
  res.status(500).json({ message: err.message });
});

module.exports = app;
