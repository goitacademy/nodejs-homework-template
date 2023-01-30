const mongoose = require("mongoose");
const app = require("./app");
require('dotenv').config();
require("colors")

const {DB_HOST,PORT} = process.env;

mongoose
  .connect(DB_HOST)
  .then(
    app.listen(PORT,() => {
      console.log("Database connection successful".rainbow);
    })
  )
  .catch((error) => {
    console.log(error.message.red);
    process.exit(1);
  });
