const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.mongo_config.MONGO_URI)
  .then(() => console.log('Database connection successful'))
  .catch((error) => console.log(error.message));

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
