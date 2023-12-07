const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { PORT, DB_HOST } = process.env;

// console.log(process.env);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful", PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
