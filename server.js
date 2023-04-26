const app = require("./app");
const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Brute1996:196633@cluster0.r73iryg.mongodb.net/contacts_reader";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
