const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;
// const { DB_HOST } = require("./config");

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running and connected to DB");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
