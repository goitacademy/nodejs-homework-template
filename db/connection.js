import "dotenv/config";
import mongoose from "mongoose";

mongoose.set("strictQuery", false);

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
