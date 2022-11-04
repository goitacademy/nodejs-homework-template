const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const contactsRouter = require("./routes/api/contacts");
const mongoose = require("mongoose");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

const { HOST } = process.env;

mongoose
  .connect(HOST)
  .then(console.log("Database connection successful"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

module.exports = app;
