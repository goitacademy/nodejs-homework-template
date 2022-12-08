/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contactsRoutes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
});

app.use((error, req, res, next) => {
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: error.message,
    data: 'Internal server error',
  });
});

module.exports = app;
