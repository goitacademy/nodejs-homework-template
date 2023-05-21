const mongoose = require("mongoose");

const {DB_HOST,PORT=3001} =process.env;
//const DB_HOST =
//  "mongodb+srv://Yuliia:VlasiukYuliiaDataBaseUser@cluster0.84r98c6.mongodb.net/db-contacts?retryWrites=true&w=majority";
const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
   process.exit(1);
  });



