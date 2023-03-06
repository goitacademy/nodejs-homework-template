const { exist } = require("joi");
const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://Rory:VZTIiHqTbFv2T2sr@cluster0.z6wgth6.mongodb.net/Phonebook?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
