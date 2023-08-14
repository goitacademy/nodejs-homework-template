const mongoose = require('mongoose');

const app = require('./app');

// Приховуємо пароль запиту
// const { DB_HOST } = require('./config');
// console.log(DB_HOST);
// console.log(process.env);
// 1) npm add dotenv
// 2) севорюємо замість config.js .env
// і записумо туди DB_HOST зі значенням

// const dotenv = require('dotenv');
// dotenv.config();
// або просто
require('dotenv').config();
const { DB_HOST, PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () =>
    console.log("Database connection successful"));
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

