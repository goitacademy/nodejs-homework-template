import dotenv from "dotenv";
import { mongoose } from "mongoose";

import { app } from "./app.js";

dotenv.config();

const connection = mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port ${PORT} `);
    });
  })
  .catch((e) => {
    console.log(`Server not running. Error message: ${e.message}`);
    process.exit(1);
  });
