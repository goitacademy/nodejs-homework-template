/** @format */

const mongoose = require("mongoose");
const app = require("./app");
// http://localhost:3000/api/contacts
const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
