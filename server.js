import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

const { DB_HOST, PORT } = process.env;

dotenv.config();

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use your API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
