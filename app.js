const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const userAuthRouter = require('./routes/api/usersAuthRouter');
const contactsRouter = require('./routes/api/contactsRouter');

const app = express();

// get env variable
const { NODE_ENV } = process.env;
const formatsLogger = NODE_ENV === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routes

app.use('/api/users', userAuthRouter);
app.use('/api/contacts', contactsRouter);

// Error 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handling
app.use((err, req, res, next) => {
  // console.log('err.name: ', err.name);
  if (err.name === 'JsonWebTokenError' || err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  res.status(500).json({ message: err.message });
});

module.exports = app;
