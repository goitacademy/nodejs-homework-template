const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { PORT, DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`);
    });
  })

  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
