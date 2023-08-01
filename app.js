const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config(); // підлючаемо змінні оточення із файла .env

const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // якщо прийшов запит на статичний файл, то його треба шукати у папці "public" 

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err; // за замовчуванням помилка 500
  res.status(status).json({ message });
})

module.exports = app;