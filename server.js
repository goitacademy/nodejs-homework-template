const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, console.log("Database connection successful"))

  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
