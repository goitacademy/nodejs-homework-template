const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST =
  "mongodb+srv://AlexRose2603:JtdUszcsc2T0Hb1B@contacts-db.lnvqx23.mongodb.net/DB-Contacts?retryWrites=true&w=majority";
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
