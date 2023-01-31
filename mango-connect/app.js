// vQKcwl7nRVRl5pUA
const mongoose = require("mongoose");
DB_HOST =
  "mongodb+srv://okraichenko:vQKcwl7nRVRl5pUA@cluster0.yukfpdx.mongodb.net/contacts_reader?retryWrites=true&w=majority";
//   "mongodb+srv://okraichenko:vQKcwl7nRVRl5pUA@cluster0.yukfpdx.mongodb.net/  contacts_reader(цю частину вписуємо самостійно!!!)   ?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect"))
  .catch((err) => console.log(err.message));
