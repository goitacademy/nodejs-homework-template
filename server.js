const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Serhii:Wt1r1sid8CzBALat@cluster0.m8qwrou.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
