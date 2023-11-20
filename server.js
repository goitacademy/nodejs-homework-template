import mongoose from "mongoose";

import app from "./app.js";

// console.log(process.env);

const { DB_HOST, PORT = 3000 } = process.env;

// import { DB_HOST } from "./config.js";
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
