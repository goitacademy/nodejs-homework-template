const express = require('express');                                    // створюємо веб-сервер
const logger = require('morgan');                                      // для протоколювання запитів з можливістю налаштування формату виведення. Дозволить обробити свої журнали аналітичними застосунками, що генерують корисну статистику                
const cors = require('cors');                                          // cors - всередині неї запускається мідлваре, де запускається дозвіл на кросдоменні запити (коли фронтенд і бекенд запущені на різних серверах)                                     
const dotenv = require("dotenv");                                      // для того, щоб добавити змінну в змінні оточення

const contactsRouter = require("./routes/api/contacts");               // підключаємо роутери з контактами (сторінку про контакти до книги)

dotenv.config();                                                       // шукає файл .env і додає дані з файлу у змінні оточення
// require("dotenv").config(); можна  ітак написати
const app = express()                                                  // запускаємо сервер

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'; 

app.use(logger(formatsLogger));                                       // викликаємо morgan
app.use(cors());                                                      // всередині неї запускається мідлваре, де запускається дозвіл на кросдоменні запити (коли фронтенд і бекенд запущені на різних серверах)
app.use(express.json());                                              // парсер для отримання данних у форматі json

app.use("/api/contacts", contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, })
})


module.exports = app
