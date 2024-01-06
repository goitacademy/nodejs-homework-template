const app = require("./app");

const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config({
//   path: process.env.NODE_ENV === "production" ? "./envs/p" : "./envs/dev.env",
// });

const { DB_HOST } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
