const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// -----------------------------------------------------------
/* Створення змінних оточення 
Додає у змінні оточення (process.env) данні з файла .env - 
рядок підключення до бази данних DB_HOST
*/

// const dotenv = require("dotenv");
// dotenv.config();
// Те саме:
// require("dotenv").config();

// const { DB_HOST, PORT = 3000 } = process.env;
// -----------------------------------------------------------
