const mongoose = require("mongoose");
const app = require("./app");
const DB_HOST =
  "mongodb+srv://Inna:kapitoshka2019@cluster0.guvsevh.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((er) => {
    console.log(er);
    process.exit(1);
  });
