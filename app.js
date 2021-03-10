const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const { HttpCode } = require('./helpers/constants');

const app = express();

const USERS_AVATARS = process.env.USERS_AVATARS;
app.use(express.static(path.join(__dirname, USERS_AVATARS)));

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// helmet for better headers in the response
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
// limit for big data - 10000 bites limit is set
app.use(express.json({ limit: 10000 }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      data: 'Bad Request',
      message: 'Too many requests, please try again later.',
    });
  },
});

app.use('/api/', apiLimiter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
