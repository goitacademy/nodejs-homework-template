const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  // .then(() => console.log("Database connection successful"))
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
