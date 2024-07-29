const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use('/avatars', express.static(path.join(__dirname, 'public/avatars')));

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
