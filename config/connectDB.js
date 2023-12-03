const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { DB_HOST } = process.env;

    await mongoose.connect(DB_HOST);
  } catch (error) {
    console.warn(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
