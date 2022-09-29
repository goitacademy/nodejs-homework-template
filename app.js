const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts');
const userRouter = require('./routes/api/users');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, _, res, __) => {
  const {status = 500, message = "Server error"} = err;
  // const message = status === 500 ? "Server error" : err.message;
  res.status(status).json({ message, })
})


module.exports = app;
