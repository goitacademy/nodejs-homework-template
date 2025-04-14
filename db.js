const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb://localhost:27017/contactsDB";
    await mongoose.connect(uri, {
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
