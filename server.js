const app = require("./app");
const chalk = require("chalk");
require("dotenv").config();
const mongoose = require("mongoose");

const password = "4GiySuWAY9BNh1CW";
const DB_HOST = `mongodb+srv://Andrey:${password}@cluster0.g15sl8d.mongodb.net/db-contacts?retryWrites=true&w=majority`;

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
