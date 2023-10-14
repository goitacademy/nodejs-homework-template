// app.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');  

require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/db-contacts'; //  URI з MongoDB Atlas

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connection successful');
});

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
