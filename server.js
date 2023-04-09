const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Gora:fhbyf101209@contacts-base.qxykpsa.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) =>
    console.log(`Server not running. Error message: ${error.message}`)
  );
