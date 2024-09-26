const mongoose = require("mongoose");

const DBPATH = process.env.DB_SECRET;

if (!DBPATH) {
  console.error("No db secret provided");
}

const connectToDatabase = async () => {
  mongoose
    .connect(DBPATH)
    .then(() => console.log("Database connection successful"))
    .catch((error) => {
      console.log("Error connecting to db server", error);
      process.exit(1);
    });
};

module.exports = { connectToDatabase };