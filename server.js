const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3001, () => {
      console.log("Database connection successful on port 3001");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
