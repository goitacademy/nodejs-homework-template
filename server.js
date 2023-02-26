const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://User:123456Qwer@cluster0.tmotho5.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000, () => {
    console.log("Database connection successful");
  }))
  .catch((error) => {console.log(error.message);
process.exit(1)});

const app = require("./app");


