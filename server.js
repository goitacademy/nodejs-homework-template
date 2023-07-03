const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://Yakomoga:vskmqjyth111111@cluster0.escdzh4.mongodb.net/db-contacts?retryWrites=true&w=majority";

// connect to basedata
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {});
  })
  .catch((error) => {
    console.log(error.message);

    // disables running processes
    process.exit(1);
  });
