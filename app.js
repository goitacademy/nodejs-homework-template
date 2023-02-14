const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { routerContacts } = require('./routes/api/contacts');
const { authRouter } = require('./routes/api/auth');
const { userRouter } = require('./routes/api/user');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// middlewares

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// routes

app.use('/api/contacts', routerContacts);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/public/avatars', express.static('public/avatars'));

// 404

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// error handling

app.use((error, req, res, next) => {
  console.error('Handling errors:', error.message, error.name);

  // handle mongoose validation error
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      message: error.message,
    });
  }

  // handle ObjectId validation:

  if (error.message.includes('Cast to ObjectId failed for value')) {
    return res.status(400).json({ message: 'id is invalid' });
  }

  if (error.status) {
    return res.status(error.status).json({
      message: error.message,
    });
  }

  return res.status(500).json({ message: error.message });
});

module.exports = app;
