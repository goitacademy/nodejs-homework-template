import app from "./app.js";
import mongoose from "mongoose";

const { DB_HOST, DB_NAME, PORT = 3000 } = process.env;

const connection = mongoose.connect(
  `${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
);

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
