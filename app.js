const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { contactsRouter, authRouter, userRouter } = require('./routes/api');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
