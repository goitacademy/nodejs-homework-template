const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 300 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => console.log(error.message));
