const mongoose = require("mongoose");

const app = require("./app");

const {
  DB_HOST = "mongodb+srv://dolphin10001000:2X937D83C27TjF0h@cluster0.wifylhl.mongodb.net/db-contacts?retryWrites=true&w=majority",
  PORT = 3000,
} = process.env;


mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
