const mongoose = require("mongoose");

const app = require("./app");

const { DB_CONTACTS } = process.env;

mongoose
  .connect(DB_CONTACTS)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
