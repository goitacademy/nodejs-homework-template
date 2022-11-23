const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const { BASE_API_URL } = process.env;

const contactsRouter = require('./routes/api/contacts');
const { errorHandler } = require('./helpers/apiHelpers');

const app = express();

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(BASE_API_URL, contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

module.exports = app;
