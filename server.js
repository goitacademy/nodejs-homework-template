const mongoose = require("mongoose");
const app = require("./app");
const BD_HOST = require("./helpers/BD_path");

mongoose
  .connect(BD_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((err) => {
    console.log(err), process.exit(1);
  });
