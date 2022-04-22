const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send(err.message);
});

module.exports = app;
