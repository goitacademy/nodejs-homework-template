const { error, log } = require("console");
const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Serhii:2577240761@cluster0.8oirtxz.mongodb.net/contacts-reader?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
