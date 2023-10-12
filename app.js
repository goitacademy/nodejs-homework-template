const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

app.use(express.json());

mongoose.connect('mongodb+srv://ilapalatov:smR9cgpOJb4EYijf@ilya.17ziwf8.mongodb.net/db-contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

module.exports = app;
