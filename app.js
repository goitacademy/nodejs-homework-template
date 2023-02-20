// quzz7qPsVKgEXaHX

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));

/** this middleware helps solve problems related to cors */
app.use(cors());

/** this middleware recognizes content type of body */
app.use(express.json());

/** here are send our routes */
app.use('/api/contacts', contactsRouter);

/** if front-end require for what is not */
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

/** if something went wrong */
app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
