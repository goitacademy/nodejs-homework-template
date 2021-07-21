const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

const app = express();

const contactsRouter = require('./routes/api/contacts');

app.use(cors());
app.use(express.json());

app.use('/api/v1/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose
  .connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database running');
    app.listen(PORT);
  })
  .catch(error => console.log(error));

module.exports = app;
