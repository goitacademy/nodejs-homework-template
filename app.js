const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const tokenCheck = require('./helpers/token-check');
const { HttpCodes, Limits } = require('./helpers/constants');

const contactsRouter = require('./routes/api/contacts/contacts');
const usersRouter = require('./routes/api/users/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limits.JSON }));

app.use('/api/contacts', tokenCheck, contactsRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ status: 'error', code: HttpCodes.NOT_FOUND, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const status = err.status || HttpCodes.INTERNAL_SERVER_ERROR;
  res.status(status).json({ status: 'fail', code: status, message: err.message });
});

module.exports = app;