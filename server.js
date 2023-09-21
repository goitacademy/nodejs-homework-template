import { app } from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {
  STORE_AVATARS_DIRECTORY,
  UPLOAD_DIRECTORY,
} from "./middlewares/multer.js";
import { initializeDirectory } from "./utils.js";

dotenv.config();

const { MONGODB_URI } = process.env;

export const dataBase = mongoose.connect(MONGODB_URI, {
  dbName: "db-contacts",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
  process.exit(1);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Connection to Data Base is closed");
  process.exit();
});

const PORT = 3000;

dataBase
  .then(() => {
    app.listen(PORT, async () => {
      await initializeDirectory(UPLOAD_DIRECTORY);
      await initializeDirectory(STORE_AVATARS_DIRECTORY);
      console.log(`Server running. Use our API on port: ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(`Server not run. Error:${error.message}`);
  });
