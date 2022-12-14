const app = require("./app");

const dotenv = require("dotenv");
dotenv.config();

const DB_HOST = process.env.DB_HOST;
const mongoose = require("mongoose");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
