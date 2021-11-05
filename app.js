const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config();
const USERS_AVATARS = process.env.USERS_AVATARS;
const PUBLIC_FOLDER = process.env.PUBLIC_DIR;

const usersRouter = require('./routes/users/users');
const contactsRouter = require('./routes/contacts/contacts');
const { HttpCode, ResponseStatus } = require('./config/constants');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(express.static(path.join(PUBLIC_FOLDER)));
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: ResponseStatus.ERROR,
    code: HttpCode.NOT_FOUND,
    message: 'Not found',
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    status:
      statusCode === HttpCode.INTERNAL_SERVER_ERROR
        ? ResponseStatus.FAIL
        : ResponseStatus.ERROR,
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
