const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(8000);
  })
  .then(() => {
    console.log(`server is on 8000`);
  })
  .catch((err) => {
    console.log("ERROR", err);
    process.exit(1);
  });
