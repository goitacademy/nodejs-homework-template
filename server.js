import { error } from "console";
import app from "./app.js";
import mongoose from "mongoose";

// const DB_HOST =
//   "mongodb+srv://Gunnar:INOLA3MNYnLZr2ji@cluster0.n9sqlua.mongodb.net/my-contacts?retryWrites=true&w=majority";

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
