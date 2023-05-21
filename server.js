const mongoose = require("mongoose");

const {DB_HOST} =require("./config")
//const DB_HOST =
//  "mongodb+srv://Yuliia:VlasiukYuliiaDataBaseUser@cluster0.84r98c6.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");



// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
