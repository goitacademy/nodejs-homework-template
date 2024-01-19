const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const mongoose = require('mongoose');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Database connection error:', error);
  process.exit(1);
});
db.once('open', () => {
  console.log('Database connection successful');
});

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
