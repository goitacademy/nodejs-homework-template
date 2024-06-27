const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGODB_URL = process.env.MONGODB_URL;
    await mongoose.connect(MONGODB_URL); // Eliminar opciones obsoletas
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
