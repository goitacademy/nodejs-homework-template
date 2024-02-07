const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const { DB_HOST } = process.env;

const setupMongoConnection = async () => {
  try {
    if (!DB_HOST) {
      throw new Error("DB_HOST is not defined in the environment variables");
    }

    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = setupMongoConnection;
