const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');

require('dotenv').config();
const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(
  (
    { status = 500, message = 'Internal Server Error', details = null },
    req,
    res,
    next
  ) => {
    const result = { message };

    if (details) {
      result.details = details;
    }

    res.status(status).json(result);
  }
);

module.exports = app;
// const { randomBytes } = require('node:crypto');
//
// });
