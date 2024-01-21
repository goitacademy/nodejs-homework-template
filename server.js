const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Oleg_vn:Creesi98@cluster0.a0yenih.mongodb.net/db-contacts?retryWrites=true&w=majority";
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
