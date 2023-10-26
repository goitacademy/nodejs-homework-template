// app.js
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const verifyRouter = require('./routes/verify');
const resendRouter = require('./routes/resend');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ilapalatov:smR9cgpOJb4EYijf@ilya.17ziwf8.mongodb.net/db-contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/verify', verifyRouter);
app.use('/resend', resendRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
