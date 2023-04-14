const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Vadym:4ncFdX2jR3Nh7t7a@cluster0.6cdhoup.mongodb.net/contacts_reader?retryWrites=true&w=majority";

const app = require("./app");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
