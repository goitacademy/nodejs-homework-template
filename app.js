const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

require("dotenv").config();

app.use("/api/contacts", contactsRouter);

//========================mongo========================================
mongoose.connect(process.env.MONGODB_URL).then(() => {
  try {
    console.log("mongo db connection");
  } catch (error) {
    process.exit(1);
    console.log(error);
  }
});
//================================================================

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
