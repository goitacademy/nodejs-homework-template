<<<<<<< Updated upstream
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
=======
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/api/contacts';
import mongoose from 'mongoose';
>>>>>>> Stashed changes

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const expressJwt = require('express-jwt');
const authenticateToken = expressJwt({ secret: 'secret_key', algorithms: ['HS256'] });

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

app.use('/api/users', authenticateToken, usersRouter);

app.use('/api/contacts', authenticateToken, contactsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
<<<<<<< Updated upstream
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    res.status(500).json({ message: err.message });
  }
});

module.exports = app;
=======
  return res.status(500).json({ message: err.message });
});

export default app;
>>>>>>> Stashed changes
