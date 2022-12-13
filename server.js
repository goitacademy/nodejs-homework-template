const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connected successfuly");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
