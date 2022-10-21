const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Database connection successful on port ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(`Database connection was failed. ${error.message}`);
    process.exit(1);
  });
