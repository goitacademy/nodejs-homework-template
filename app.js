require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

app.use(bodyParser.json());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

app.use('/contacts', contactsRouter);
app.use('/users', usersRouter);

module.exports = app;
