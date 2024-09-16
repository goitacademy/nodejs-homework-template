const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

const { DB_HOST } = process.env;
const { PORT } = process.env;
const portForConnection = PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Mongo DB successfully connected ...");
  })
  .catch((error) => {
    console.log(
      `Database connection has not been successful because of: ${error.message}`
    );
    process.exit(1);
  });

module.exports = app.listen(portForConnection, () => {
  console.log(`Use our API in local connection on port: ${portForConnection}`);
});
