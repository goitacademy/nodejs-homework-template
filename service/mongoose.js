const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb+srv://PawSzat:HumanSus@cluster0.mevhp.mongodb.net/test")
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log("err", err);
    process.exit(1);
  });

const Schema = mongoose.Schema;

module.exports = Schema;
