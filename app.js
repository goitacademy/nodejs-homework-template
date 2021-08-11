const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const api = require('./api/');
require('./config/config-passport');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', api.contacts);
app.use('/api/v1/users', api.users);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, _, res, __) => {
  const { code = 500, message = 'Server error' } = err;
  res.status(code).json({ message });
});

module.exports = app;
