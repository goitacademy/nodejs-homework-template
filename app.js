const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

dotenv.config(); // запись содержимого из .env (ключ доступа) в process.env
const { DB_HOST } = process.env;

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // нужно для отправки тела запроса в формате json

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

module.exports = app;
