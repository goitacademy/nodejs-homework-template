import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.MONGODB_CONNECTION_STRING;

export const dbConnect = async () => {
  try {
    await mongoose.connect(DB_HOST, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1);
  }
};

export const dbDisConnect = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
};
