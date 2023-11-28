const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const contactsRouter = require("./routes/api/contacts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://dbuser:12345@cluster0.tmfwdxi.mongodb.net/db-contacts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

module.exports = app;
