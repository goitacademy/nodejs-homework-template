// vQKcwl7nRVRl5pUA
const mongoose = require("mongoose");
// const DB_HOST = require("./config");так не можно, бо файлу конфіг теж не буде на гіті
const dotenv = require("dotenv");
// ми ховаємо пароль,що в DB_HOST лежить, у файлі config та витягаємо на 6 стоці
// подробиці https://www.edu.goit.global/uk/learn/6296075/1156869/1156933/lessons на 1:30хв
dotenv.config();
const { DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connect"))
  .catch((err) => console.log(err.message));
