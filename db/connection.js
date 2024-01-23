import { mongoose } from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", true);

dotenv.config();
const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connection successful");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export { connectMongo };
