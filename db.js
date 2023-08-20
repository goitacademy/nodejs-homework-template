const mongoose = require("mongoose");

const DB_URL = process.env.DB_URI;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
