// zAGvUUxi8E4DA9uY

const app = require("./app");

const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Serhiy:zAGvUUxi8E4DA9uY@cluster0.1gpmswf.mongodb.net/db-contacts?retryWrites=true&w=majority";
// console.log("Database connection successful");
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
