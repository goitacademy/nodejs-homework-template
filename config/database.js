const mongoose = require("mongoose");

const dbpath = 'mongodb+srv://dimas_zd:X32fCHGr6VWrtOXj@cluster13.ecufgwe.mongodb.net/contacts?retryWrites=true&w=majority';

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.log("error to connect db" + err);
      process.exit(1);
    });
};

module.exports = { connectDatabase };
