const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts-routes');
const authRouter = require('./routes/api/auth-routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts/', contactsRouter);
app.use('/users', authRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts for contacts and /users for user request operations',
    data: 'Not found'
  });
});

app.use((err, _, res, __) => {
  console.log(err)
  const {status = '500', message = 'Internal error'} = err;
  res.status(status).json({
    message
  });
});

module.exports = app
