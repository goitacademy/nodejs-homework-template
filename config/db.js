const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const uriDb = process.env.MONGO_URI;
    await mongoose.connect(uriDb);
    console.log("Database connection successful");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
