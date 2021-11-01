const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');

const usersRouter = require('./routes/users/users');
const contactsRouter = require('./routes/contacts/contacts');
const { HttpCode } = require('./config/constants');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, req, res, next) => {
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .json({
      status: 'fail',
      code: HttpCode.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
});

module.exports = app;
