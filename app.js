const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// MongoDB connection string
const uri = "mongodb+srv://vspasedust:eaiyDSBkLIZ623xy@cluster0.kz32p8l.mongodb.net/?retryWrites=true&w=majority";

// Підключення до бази даних
mongoose.connect(uri)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
    process.exit(1);
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
