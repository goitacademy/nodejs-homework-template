const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const api = require('./routes/api');

const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
require('./configs/passport-config');

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', api.contacts);
console.log(api.contacts, 'apiContacts');
app.use('/api/auth', api.auth);
app.use('/api/users', api.users);

app.use((_, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found',
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = 'Server error' } = error;

  res.status(code).json({
    status: 'fail',
    code,
    message,
  });
});

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(async () => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => console.log(error));

module.exports = app;
