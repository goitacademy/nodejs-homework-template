const app = require("./app");

const mongoose = require("mongoose");
const { DB_HOST } = process.env;
console.log("DB_HOST from process.env:", process.env.DB_HOST);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful on port 3000");
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });