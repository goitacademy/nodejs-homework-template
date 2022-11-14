const fs = require('fs');
const path = require('path');

const express = require('express');
// const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const contactsRouter = require('./routes/api/contacts');
const morgan = require('morgan');

const app = express();

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

//* logger console.log;
// app.use(logger(formatsLogger));

//* logger-file /public/server.log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname.split('routes')[0], './public/server.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  status === 500
    ? res.status(status).json({ message: 'Server error' })
    : res.status(status).json({ message });
});

module.exports = app;
