const express = require('express');
// .це для виводу вконсоль
const logger = require('morgan');
const cors = require('cors');
// config() шукає текстові файли і додає 
// дані DB_HOST, PORT в змінні оточення  process.env
require("dotenv").config();

const contactsRouter = require('./routes/api/contacts');

const app = express();
// тут в консоль виводимо записи
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
// міделвари
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

module.exports = app;
