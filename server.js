const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST } = require("./constants/env");

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3030);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
