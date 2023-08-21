const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const notFoundHandler = require('./middlewares/notFoundHandler');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const globalErrorHandler = require('./middlewares/globalErrorHandler');

app.use(express.json());

app.use(logger(formatsLogger));
app.use(cors());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.use(notFoundHandler);

app.use(globalErrorHandler);

module.exports = app;
