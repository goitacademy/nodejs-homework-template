// ewaCyyLhSVY5j7-

// mongodb + srv://Alex:ewaCyyLhSVY5j7-@cluster0.sylvinh.mongodb.net/test

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
