require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });
