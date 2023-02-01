const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const {
  contactsRouter,
  authRouter,
} = require('./routes/api/');

const app = express();

const formatsLogger =
  app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid URL' });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
