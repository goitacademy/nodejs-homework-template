const express = require('express');
// const moment = require('moment');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts-routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use('/api/contacts', contactsRouter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// ведем записи лога в файле Server.log
// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format('DD-MM-YYYY_hh:mm:ss');
//   await fs.appendFile('./public/server.log', `\n${method} ${url} ${date}`);
//   next();
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
