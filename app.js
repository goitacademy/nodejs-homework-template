const express = require('express');
// const logger = require('morgan');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const api = require('./api');
app.use(cors());

app.use('/api/v1/contacts', api.contacts);
app.use('/api/v1/contacts', api.contacts);

app.use((req, res) => {
  res.status(404).json({ status: 'error', code: 404, message: 'Not found' });
});

app.use((error, _, res, __) => {
  const { code = 500, message = 'Server error' } = error;
  res.status(code).json({
    status: 'fail',
    code,
    message,
  });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connection successful');
  app.listen(PORT);
})
  .catch((error) => console.log(error));

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))

// module.exports = app
