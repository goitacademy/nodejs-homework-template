const mongoose = require("mongoose");

const connectMobgoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Error connecting to database, error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectMobgoDB };
