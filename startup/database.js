const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const dbpath = process.env.MONGO_SECRET;
if (!dbpath) {
  console.error("No db secret");
}

const connectToDataBase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("connected to mongo db.."))
    .catch((err) => {
      console.log("error to connect db //" + err);
      process.exit(1);
    });
};

module.exports = connectToDataBase;
