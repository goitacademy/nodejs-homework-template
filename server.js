import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();

const { DATABASE_HOST } = process.env;
const PORT = 3000;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DATABASE_HOST);
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1);
  }
};

connectToDatabase();
