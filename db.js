const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.DB_HOST;
    await mongoose.connect(MONGODB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
