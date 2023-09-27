const app = require("./app");
require("dotenv").config();

const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
