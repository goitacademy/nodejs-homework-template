const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const contactsRouter = require("./routes/api/contacts");

const app = express();
const DB_HOST = process.env.DB_HOST;

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

async function connection() {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
  });
}

module.exports = { app, connection };
