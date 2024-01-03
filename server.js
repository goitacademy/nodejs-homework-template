const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST } = process.env;
// const { DB_HOST } = require("./config");

//* На ПК немає такого ключа (властивості), який ввели на render.com:
console.log(process.env.DB_HOST);
//* Але з'являється, коли записуємо у файл '.env' (після встановлення пакету 'dotenv')

mongoose.set(`strictQuery`, true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3002);
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3002, () => {
//   console.log("Server running. Use our API on port: 3002");
// });
