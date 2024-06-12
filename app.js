const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const urlDB = process.env.DB_HOST;

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const startServer = async () => {
  try {
    await mongoose.connect(urlDB);
    console.log('database succesfully connected');
    app.listen(8080, () => {
      console.log('server started on http//localhost:8080');
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
