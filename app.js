const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'; // проверка в каком режиме запущен сервер

app.use(logger(formatsLogger));// middleware которая логирует запрос(в консоль)
app.use(cors());
app.use(express.json());// middleware проверяет есть ли тело запроса

app.use('/api/contacts', contactsRouter);// создаем группу маршрутов

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' }) // обрабатывает ситуацию,когда запрос пошел по адресу, которого нету
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message, })
})

module.exports = app;
