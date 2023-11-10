import app from "./app.js";
import mongoose from "mongoose";

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});

mongoose
  .connect(
    "mongodb+srv://charliedajani:jamil212@cluster0.eqrgn5f.mongodb.net/db-contacts?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
  });
