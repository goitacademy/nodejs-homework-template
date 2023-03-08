const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contactsRoutes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// REST API
app.use('/api/contacts', contactsRouter);
// app.use('/api/contacts/:id', contactsRouter);
/**
 * Handle "not found" requests
 */
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

/**
 * Global error handler (middleware with 4 params)
 */
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
  next();
});

module.exports = app;
