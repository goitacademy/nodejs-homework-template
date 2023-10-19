const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

mongoose.connect('mongodb+srv://ilapalatov:smR9cgpOJb4EYijf@ilya.17ziwf8.mongodb.net/db-contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const usersRouter = require('./routes/api/users');
app.use('/users', usersRouter);

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
