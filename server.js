import mongoose from "mongoose";

import app from "./app.js";

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
