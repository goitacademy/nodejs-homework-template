const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Lika:Lika1986@cluster0.cmmq8ds.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
