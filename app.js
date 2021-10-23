const express = require('express');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/contacts/contacts');
const usersRouter = require('./routes/users/users');
const { HttpCode } = require('./config/constants');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.static('public'));
app.use(helmet());
app.get('env') !== 'test' && app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((error, _req, res, _next) => {
  const statusCode = error.status || HttpCode.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? 'Fail' : 'error',
    code: statusCode,
    message: error.message,
  });
});

module.exports = app;
