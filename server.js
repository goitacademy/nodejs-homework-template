const mongoose = require("mongoose");

const app = require("./app");
// Bb4UJCjdP79TGDOV
const DB_CONTACTS =
  "mongodb+srv://Olena:Bb4UJCjdP79TGDOV@cluster0.qj82cn3.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => error.message);
