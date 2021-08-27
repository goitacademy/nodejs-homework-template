const express = require('express');
const logger = require('morgan');
const cors = require('cors'); //разрешает cros доменные запросы

const api = require('./routes/api');

const app = express(); // app - our server

app.use(cors());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger));

app.use(express.json())

app.use('/api/contacts', api.contacts);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app
