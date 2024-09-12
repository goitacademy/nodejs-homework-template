const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Mariia:5QKrskTJKLhG5tty@cluster0.i48p13l.mongodb.net/db-contacts?retryWrites=true&w=majority";

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

const app = require("./app");

// 5QKrskTJKLhG5tty
