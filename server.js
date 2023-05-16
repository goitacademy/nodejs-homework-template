const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Minaht:GiDeOn1983@cluster0.ccmrmnr.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("connect base");
  })
  .cath((error) => {
    console.log(error.message);
    process.exit(1);
  });
