require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_URL;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(MAIN_PORT, function () {
      console.log("Database connection successful");
      console.log(`Server is running on http://localhost:${MAIN_PORT}`);
      console.log(process.env.DB_URL);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
