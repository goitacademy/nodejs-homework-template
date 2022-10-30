const app = require("./app");

const mongoose = require("mongoose");

const { DB_URL, PORT } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
