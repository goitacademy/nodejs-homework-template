const app = require("./app");
const chalk = require("chalk");
require("dotenv").config();
const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, (error) => {
      if (error) return console.error(error.message);

      console.log(chalk.cyan.underline(`http://localhost:${PORT}`));
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
