const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // Middleware для парсинга JSON-тела запроса

app.use('/api/contacts', contactsRouter); // Роутер для контактов

// Обработка несуществующих маршрутов
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Обработчик ошибок
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;
