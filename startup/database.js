const mongoose = require("mongoose");

const dbpath = process.env.DB_HOST;

if (!dbpath) {
  console.error("No db secret...");
}

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Database connection successful"))
    .catch((error) => {
      console.log(error)
      process.exit(1)
    });
};


module.exports = { connectDatabase };
