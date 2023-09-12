const mongoose = require("mongoose");

const {
  MONGO_DB_USER,
  MONGO_DB_PASWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
} = require("../constants/env.js");
mongoose.set("strictQuery", true);

const setupConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = setupConnection;
