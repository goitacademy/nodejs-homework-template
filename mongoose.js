// require("dotenv").config();

const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;
// console.log(process.env.DB_URI)


mongoose
  .connect(DB_URI)
  .then(() => console.log("Database connected!"))
  .catch((error) => console.error(error));
