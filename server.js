import { app } from "./app.js";
import mongoose from "mongoose";
import "dotenv/config";
const connection = mongoose.connect(process.env.DB_HOST);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log(
        "Server running. Use our API on port: 3000 http://localhost:3000/api/contacts"
      );
    });
  })
  .catch((err) => {
    console.log("DB not connected");
    process.exit(1);
  });
