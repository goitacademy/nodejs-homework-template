const mongoose = require("mongoose");
const app = require("./app");
// dkc0mTH2ZtqsVAWK;
const DB_HOST =
  "mongodb+srv://Dima:dkc0mTH2ZtqsVAWK@cluster0.5hkfnsu.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
