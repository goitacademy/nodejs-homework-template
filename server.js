const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Andrii:vHWBaGnBRbb84m8L@cluster0.pkbbha2.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
    console.log("Server start in 3000 port");
  })
  .catch((error) => {
    console.log("Database connection not successful");
    console.log(error.message);
    process.exit(1);
  });
