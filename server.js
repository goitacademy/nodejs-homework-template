const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { PORT = 3000, DB_HOST } = process.env;

const DB_HOST1 = "";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB is working");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`server is on ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR", err);
    process.exit(1);
  });
