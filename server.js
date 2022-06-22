const mongoose = require("mongoose");

const app = require("./app");
require("dotenv").config();
const uriDb = process.env.DB_HOST;

const connection = mongoose
  .connect(uriDb, {
    promiseLibrary: global.Promise,
  })
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

connection
  .then(() => {
    app.listen(3000, function () {
      console.log(process.env.NODE_ENV);

      console.log(`Server running. Use our API on port: 3000`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
