import { app } from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DATABASE_URL;
const connection = async () => {
  try {
    await mongoose.connect(uriDb, { dbName: "db-contacts" });
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  }
};

connection();
