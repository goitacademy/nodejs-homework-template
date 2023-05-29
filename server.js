const mongoose = require("mongoose");

const app = require("./app");

const { BD_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(BD_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
