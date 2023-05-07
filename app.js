const express = require('express');
// express для маршрутизації
const cors = require('cors');
// cors для обміну між доменами
const dotevn = require("dotenv");
const logger = require('morgan');

const {contactsRouter} = require('./routes/api');
const {authRouter} = require("./routes/api");

dotevn.config();
// шукає данні в текстовому файлі .env і додає змінні оточення

const app = express();
// app як записна книга, а листок до неї робимо в routes/api/contacts
app.use(express.json());
// перевіряє чи є тіло і розпізнає тип
app.use(cors());
app.use(express.static("public"));
//якщо прийде запит за файлом, брати із папки public

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))   // виводимо повну інформацію чи ні

app.use("/api/auth", authRouter);   //б-я запит на api оброблюємо роутом
app.use('/api/contacts', contactsRouter); 

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message })
})


module.exports = app
