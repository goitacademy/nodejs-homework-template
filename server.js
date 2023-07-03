const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  // .then(() => {
  //   app.listen(PORT, () => {
  //     console.log("Database connection successful");
  //   });
  // })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
