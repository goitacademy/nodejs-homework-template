const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST = process.env.DB_HOST || "mongodb://localhost:27017";

console.log(DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
