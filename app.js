const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { routerContacts } = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// routes

app.use('/api/contacts', routerContacts);

// 404

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// error handling

app.use((error, req, res, next) => {

if (error.status) {
  return res.status(error.status).json({
    message: error.message,
  })
}

  console.error('API Error: ', error.message, error.type);
  

  if (error.message.includes('Cast to ObjectId failed for value')) {
    return res.status(400).json({ message: 'id is invalid', });
  }

  return res.status(500).json({ message: error.message });
});

module.exports = app;
