const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://ykcyc13:ykcyc1313@cluster0.v4nr4ft.mongodb.net/";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

module.exports = { connectToDatabase };
