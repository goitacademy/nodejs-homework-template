const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/contacts', require('./routes/api/contacts'));
app.use('/api/contacts', require('./routes/api/favoriteRouter')); 

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
