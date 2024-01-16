const mongoose = require("mongoose");
const { serverConfig } = require("./serverConfig");

const MONGODB_URI = serverConfig.mongoURI;
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
