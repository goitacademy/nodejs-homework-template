const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;
console.log(DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT), console.log(`Database connection successful`))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
