import process from "node:process";
import { app } from "./app.js";
import "dotenv/config";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const uriDb = process.env.MONGO_KEY;
const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
      console.log(`Database connection successful`);
    });
  })
  .catch((err) =>
    setImmediate(() => {
      console.log(`Server not running. Error message: ${err.message}`);
      process.exit(1);
    })
  );
