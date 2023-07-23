const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? './environments/production.env'
      : './environments/development.env',
});

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// MongoDB Connection==========================
mongoose
  .connect(process.env.MONGO_URL)
  .then((connection) => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.log(err);

    process.exit(1);
  });

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
