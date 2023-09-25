const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Olga:d9XcUkc5iJkp5OBL@cluster1.yr9wo5f.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
