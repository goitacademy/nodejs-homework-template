import mongoose from "mongoose";
import "dotenv/config";

import app from "./app.js";

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log("error: ", error);
    process.exit(1);
  });
