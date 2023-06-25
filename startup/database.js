const mongoose = require("mongoose");

const dbpath = process.env.DB_PATH;

if (!dbpath) {
  console.log("Database path is not defined");
}

const connectDatabase = async () => {
  try {
    await mongoose.connect(dbpath);
    console.log("Database connection successful");
  } catch (error) {
    console.log("Database connection error");
    process.exit(1);
  }
};

module.exports = connectDatabase;