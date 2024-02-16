require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const dbURI = "mongodb+srv://FilipKuta:iuYm1a1CzgSYDLNU@goit.kv1ixgm.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";
const PORT = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });
