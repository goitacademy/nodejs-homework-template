const mongoose = require("mongoose");
const {
  MONGO_DB_USER,
  MONGO_DB_PASWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
} = require("../constants/env.js");

const setupConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    );
    console.log("Database connection successful...");
  } catch (error) {
    console.error(error);
  }
};

module.exports = setupConnection;
