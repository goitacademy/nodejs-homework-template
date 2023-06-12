const app = require("./app");

const mongoose = require("mongoose");

const DB_HOST =
  "mongodb+srv://Orest:aiDPlR8gTYtrAjVk@cluster0.mfbgn01.mongodb.net/contacts-reader";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
