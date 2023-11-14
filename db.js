require("dotenv").config();

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, w: 1 })
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
