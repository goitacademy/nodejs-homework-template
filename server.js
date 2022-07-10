require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Database connection successful. Use port ${PORT}`);
  })
  .catch((error) => {
    console.log(error.massage);
    process.exit(1);
  });
