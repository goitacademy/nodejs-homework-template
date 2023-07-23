import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

// const { DB_HOST } = process.env;

const DB_HOST =
  "mongodb+srv://vkutsar:qzQNHpQYgwjuMwds@cluster0.ivj9clb.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
