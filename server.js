const mongoose = require("mongoose");
require("dotenv").config();


const app = require("./app");

const PORT = process.env.PORT;
const uriDb = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(uriDb);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
  });