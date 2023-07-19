const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Alex:MAZojSXrUVkX0p6x@cluster0.sy55ttu.mongodb.net/";
// pasword: MAZojSXrUVkX0p6x

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
