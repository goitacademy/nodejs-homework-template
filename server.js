const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://ishanya:qwerty123@cluster0.jfljxt1.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
