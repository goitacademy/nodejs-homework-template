const express = require('express');
const logger = require('morgan');
const cors = require('cors');

// // Env пакет
// const dotenv = require('dotenv');
// // Вызываем метод config он находит файл .env и добавляет в process.env
// dotenv.config();

// если нам нужно один раз можно писать так
require('dotenv').config();

// это роуты
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
// Любой запрос который начинается с /api/contacts
// он ищет в contactsRouter

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((error, req, res, next) => {
    const { status = 500, message = 'Server error' } = error;
    res.status(status).json({ message });
});

module.exports = app;
