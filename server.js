const mongoose = require("mongoose");
const app = require("./app");
const {
  MONGO_DB_USER,
  MONGO_DB_PASSWORD,
  MONGO_DB_HOST,
  MONGO_DB_DATABASE,
} = require("./constants/env");

mongoose
  .connect(
    `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connection successful");
    app.listen(3030);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
