const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    if (!process.env.DB_HOST) {
      throw new Error("DB_HOST env variable is not set");
    }
    mongoose.connect(process.env.DB_HOST);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error: ", error.message);
    process.exit(1);
  }
};

module.exports = {
  dbConnection,
};
