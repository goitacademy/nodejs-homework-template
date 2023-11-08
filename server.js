/** @format */

import mongoose from "mongoose";

import app from "./app.js";

const DB_HOST =
  "mongodb+srv://Alex:0xpX8Q5Cgj3vKchm@cluster0.cb3i7l5.mongodb.net/my-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
