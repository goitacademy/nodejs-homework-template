const mongoose = require("mongoose");

const dbpath = process.env.MONGO_SECRET;

if (!dbpath) {
  console.error("No db secret...");
}

const connectDatabase = async () => {
  await mongoose
    .connect(dbpath)
    .then(() => console.log("Database connection successful"))
    .catch((err) => {
      console.log("Error to connect to db" + err);
      process.exit(1);
    });
};

module.exports = { connectDatabase };
