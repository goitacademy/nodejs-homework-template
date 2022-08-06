// Web-Server (express)
// 1.Middleware
// 2. Тоді маршрути
// 3. В кінці обробка помилок
const express = require('express');
const logger = require('morgan'); // виводить в консоль інфо про запити
const cors = require('cors');

// global.basedir = __dirname;

// require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();

const authRouter = require('./routes/api/auth');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger)); // middleware виводить дані (запити)
app.use(cors());
app.use(express.json()); // перевіряє Content-Type,тіло парсить як обєкт

app.use('/api/auth', authRouter);
app.use('/api/contacts', contactsRouter); // якщо запит поч. з 'api/contacts', шукай обробників маршрутів тут contactsRouter

// обробка помилок
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
