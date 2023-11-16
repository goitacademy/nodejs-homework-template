const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/db-contacts", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
