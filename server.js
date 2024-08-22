import "colors";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Database connection successful");
    app.listen(port, () => {
      console.log(`Server running. Use our API on port: ${port}`.cyan);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error. " + error);
    process.exit(1);
  });
