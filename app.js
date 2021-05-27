const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { limiter } = require('./helpers/limiter');
const helmet = require('helmet');
const boolParser = require('express-query-boolean');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet()); // Скрывает лишниее и устанавливает заголовки() в целях безоп.

app.use(limiter); // защита от ддоса ( количество запросов с одного айпи)
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 15000 })); // лимит джсона в байтах
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
