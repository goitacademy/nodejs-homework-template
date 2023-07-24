import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const {DB_HOST, PORT} = process.env;

mongoose
  .connect(DB_HOST)
  .then(app.listen(PORT, () => {
    console.log("Database connection successful");
  }))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


