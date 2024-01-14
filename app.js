const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts");

require("dotenv").config();

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  try {
    console.log("mongo db connection");
  } catch (error) {
    process.exit(1);
    console.log(error);
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
