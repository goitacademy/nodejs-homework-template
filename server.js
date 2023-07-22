import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log("error =>", error.message);
    process.exit(1);
  });


