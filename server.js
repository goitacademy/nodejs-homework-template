const mongoose = require("mongoose");

const app = require("./app");

// const { DB_HOST } = process.env;
const DB_HOST =
  "mongodb+srv://Basiuk:ZFVpx7d27S6TpRZ@cluster0.fpmjaer.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
