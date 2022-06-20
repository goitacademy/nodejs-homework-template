const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const app = express();
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'short'));
app.use(cors());
app.use(express.json());
app.use('/api/v1/users', authRouter);
app.use('/api/v1/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
