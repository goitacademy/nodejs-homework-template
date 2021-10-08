const mongoose = require("mongoose");
const dotenv = require("dotenv");

const DB_HOST = process.env;

dotenv.config();

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
  });
