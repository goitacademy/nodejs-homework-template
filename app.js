//Us3XPk10iJjh6ELN

// const mongoose = require('mongoose');

// const DB_Host = "mongodb+srv://Ishtvan:Us3XPk10iJjh6ELN@cluster0.tg7suj0.mongodb.net/contacts_finder?retryWrites=true&w=majority"

// mongoose.set('strictQuery', true);

// mongoose.connect(DB_Host)
//   .then(() => console.log('Database connect success'))
//   .catch(error => console.log(error.message))


const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/api/contacts");

require("dotenv").config();

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
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

