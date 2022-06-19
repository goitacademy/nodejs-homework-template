// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const { DB_HOST } = require("./config");
dotenv.config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => console.log("database connect"))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
