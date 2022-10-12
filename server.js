const app = require("./app");

const mongoose = require("mongoose");

// const dotenv = require("dotenv");
// dotenv.config();
// require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
