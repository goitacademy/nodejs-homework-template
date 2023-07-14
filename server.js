const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.messsage);
    process.exit(1);
  });
