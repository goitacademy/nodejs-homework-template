const express = require("express");
const logger = require("morgan");
const cors = require("cors");
//
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//
// require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger(process.env.NODE_ENV === "dev" ? "dev" : "tiny"));

app.use("/api/v1/contacts", contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
