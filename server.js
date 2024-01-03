require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(DB_HOST);
    console.log("Database connection successful");
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
