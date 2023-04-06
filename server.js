const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running. Use our API on port: 5000");
    });
  })
  .catch((error) => console.log(error.message));
