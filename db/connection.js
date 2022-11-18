const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { HOST_DB } = process.env;

const connectMongo = async () => {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }
    await mongoose.connect(HOST_DB);
    console.log("DataBase connected successfully");
  } catch (error) {
    console.log("Error:", error.message);
    process.exit(1);
  }
};

module.exports = { connectMongo };
