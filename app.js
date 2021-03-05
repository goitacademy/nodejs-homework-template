const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// helmet for better header in the response
app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
// limit for big data - 10000 bites limit is set
app.use(express.json({ limit: 10000 }));

app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use((_req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
