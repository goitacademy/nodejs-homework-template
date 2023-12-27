const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_HOST)
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Database connection successful");
    })
  )
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
