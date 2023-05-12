const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
