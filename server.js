const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { BD_URL, PORT } = process.env;

mongoose
  .connect(BD_URL)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
