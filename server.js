const mongoose = require("mongoose");

//const {DB_HOST} =process.env;
console.log(process.env)

const {DB_HOST} =process.env;
//const DB_HOST = "mongodb+srv://Yuliia:VlasiukYuliiaDataBaseUser@cluster0.84r98c6.mongodb.net/db-contacts?retryWrites=true&w=majority";
//console.log(DB_HOST)
const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001);
  })
  .catch((error) => {
    console.log(error.message);
   process.exit(1);
  });



