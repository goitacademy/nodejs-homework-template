const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const {contactsRouter} = require('./routes/contacts');
const {authRouter} = require('./routes/auth');
const {userRouter} = require('./routes/user');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }
  console.error("API Error: ", err.message);
  res.status(500).json({
    message: "Internal server error",
  });
})

module.exports = app;
