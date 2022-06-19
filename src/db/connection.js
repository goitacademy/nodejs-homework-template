const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectMongo = async () => {
  await mongoose.connect(MONGO_URI, { dbName: "GOIT" });
  console.log("Database connection successful!");
};

module.exports = {
  connectMongo,
};
