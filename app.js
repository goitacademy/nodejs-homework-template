const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./routes/api/contacts-router');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// global middlewares
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // if body content-type application/json, middleware create object in req.body

// route
app.use('/api/contacts', contactsRouter);

// other middlewares
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message, });
});

module.exports = app;
