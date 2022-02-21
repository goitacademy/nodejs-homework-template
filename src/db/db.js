const mongoose = require("mongoose");

const { getConfig } = require("../config");

const url = getConfig().url;

async function dbConnection() {
  try {
    await mongoose.connect(url);

    console.log("Database connection successful");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
module.exports = dbConnection;
