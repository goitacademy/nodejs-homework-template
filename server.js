import { app } from "./app.js";
import colors from "colors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

try {
  const connection = await mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    retryWrites: true,
  });
  mongoose.Promise = global.Promise;

  if (connection) {
    app.listen(3000, () => {
      console.log(
        `${colors.cyan("[server]")} Server running. Use our API on port: 3000`
      );
    });
  }
} catch (error) {
  console.log(`${colors.green("[database]")} ${colors.red(error.message)}`);
}
