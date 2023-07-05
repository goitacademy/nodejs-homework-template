const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Aleksandr:N4gkynSsXmdIAT0n@cluster0.zocznma.mongodb.net/contacts-reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connections successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
