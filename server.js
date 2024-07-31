const mongoose = require("mongoose");
const app = require("./app");

const MAIN_PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_MANGO;

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    app.listen(MAIN_PORT, function () {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
