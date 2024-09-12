const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST } = process.env;

// console.log(process.env.DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => console.log(error.message));
