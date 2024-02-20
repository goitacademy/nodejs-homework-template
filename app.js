const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const router = require("./api/contactRouter");
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();

const DB_URL = process.env.DB_HOST

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URL)
    console.log('Database connection successful')
  }
  catch (error) {
    console.error(error)
    process.exit(1)
  }
} 
dbConnection()


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

console.log(process.env.DB_HOST)
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/',router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
