const app = require("./app");
require("dotenv").config();

const mongoose = require("mongoose");

const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "./configs/development.env"),
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(process.env.PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
