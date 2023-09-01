const mongoose = require("mongoose");

const app = require("./app");

mongoose.set("strictQuery", true);

const DB_HOST =
  "mongodb+srv://Anton:ddance@cluster0.2visb3k.mongodb.net/contacts";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
