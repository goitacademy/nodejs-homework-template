const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Midlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Controllers
app.use('/api/contacts', contactsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found' });
  next();
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
  next();
});

module.exports = app;
