const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const { DB_STRING } = process.env;

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(DB_STRING, {});
    console.log("Database connection successful");
  } catch (error) {
    console.log(`Failed to connect Database. Error message: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
