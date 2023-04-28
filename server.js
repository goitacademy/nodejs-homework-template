import path from "node:path";
import { app } from "./app.js";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { dirExist } from "./utils/storage.js";
import { temDir, updateDir } from "./constant.js";

dotenv.config();

const connection = mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  retryWrites: true,
});
connection
  .then(() => {
    app.listen(3000, () => {
      dirExist([temDir, updateDir]);
      console.log(
        `${colors.cyan("[server]")} Server running. Use our API on port: 3000`
      );
    });
  })
  .catch((error) => {
    console.log(`${colors.green("[database]")} ${colors.red(error.message)}`);
    process.exit(1);
  });
