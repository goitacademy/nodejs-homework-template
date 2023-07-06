// ZPLUyHUegDaLFvUj
const app = require("./app");
const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Yevhen-user:ZPLUyHUegDaLFvUj@cluster0.lbojy4u.mongodb.net/db_contacts?retryWrites=true&w=majority";
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
