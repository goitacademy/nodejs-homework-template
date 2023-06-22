const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running and connected to DB. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
