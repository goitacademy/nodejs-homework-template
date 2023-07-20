const mongoose = require("mongoose");

const app = require("./app");

require("dotenv").config();

const { DB_HOST } = process.env;
const { PORT } = process.env;
const portForConnection = PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(portForConnection, () => {
      console.log(
        `Database connection successful. Use our API on port in local connection: ${portForConnection}`
      );
    });
  })
  .catch((error) => {
    console.log(
      `Database connection is not successful because of: ${error.message}`
    );
    process.exit(1);
  });
