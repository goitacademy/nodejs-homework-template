import { app } from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = async () => {
  try {
    const db = await mongoose.connect(uriDb);
    console.log("DB connected");

    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(err.message);
  }
};
connection();
