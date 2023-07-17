const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://klevets00:ss1TETOAOI9E09hB@cluster0.htejwxs.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
