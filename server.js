const app = require("./app");
// require("dotenv").config();
const mongoose = require("mongoose");

// const DB_HOST =
// "mongodb+srv://ievsepl:50513970@cluster0.clrteox.mongodb.net/db-contacts?retryWrites=true&w=majority";

const { PORT = 3000, DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
