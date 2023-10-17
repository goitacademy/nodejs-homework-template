const mongoose = require("mongoose");

const app = require("./app.js");
// nB9_3mnLHNb2Maf

const DB_HOST =
  "mongodb+srv://Olga:nB9_3mnLHNb2Maf@cluster0.bp8q1bj.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
