const app = require("./app");

const { Host } = process.env;

const mongoose = require("mongoose");

mongoose
  .connect(Host)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
