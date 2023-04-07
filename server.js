const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error(`Database connection error: ${err}`);
    process.exit(1);
  })
  .then(() => app.listen(PORT))
  .catch((error) => console.log(error.message));
