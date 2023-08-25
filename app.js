const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/contactsRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// Middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
