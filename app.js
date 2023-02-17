const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contactsRouter');
const usersRouter = require('./routes/api/usersRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', contactsRouter);
app.use('/api', usersRouter);

app.use((req, res) => {
  console.log('Ошибка 404 пришла в app.js');
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.log('Ошибка 500 пришла в app.js');
  res.status(500).json({ message: err.message });
});

module.exports = app;
