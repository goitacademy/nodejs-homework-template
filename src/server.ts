import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";

dotenv.config();

const { DB_HOST }: any = process.env;

mongoose.set("strictQuery", true);

const port = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(port);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
