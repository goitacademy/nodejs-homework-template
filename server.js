import mongoose from "mongoose";

import app from "./app.js";
// Kostiantyn;
// aBbkYOZ9ViiUCJnW;
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}\nDatabase connection successful`
      );
    });
    // console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
