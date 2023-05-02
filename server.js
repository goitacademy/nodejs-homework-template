const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
