const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { HttpCode } = require('./service/constants');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const { createAccountLimiter } = require('./service/rate-limit');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

app.use('/api/', createAccountLimiter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res
    .status(err.status || HttpCode.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
});

module.exports = app;
