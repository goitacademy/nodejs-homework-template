require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");

const uriDb = process.env.DB_URI;

mongoose
  .connect(uriDb)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000, () => {
      console.log(`Server running on port: 3000`);
    });
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });