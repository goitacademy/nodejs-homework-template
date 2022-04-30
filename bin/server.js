const app = require("../app");

const mongoose = require("mongoose");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.info(`Database connection \x1b[7m successful \x1b[0m`);
    console.info(`Server running. Use our API on port: \x1b[1m3000\x1b[0m`);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
