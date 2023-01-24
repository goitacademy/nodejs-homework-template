const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const morgan = require('morgan');

const { routerContacts } = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// middelvwares
app.use(cors());
app.use(logger(formatsLogger));
app.use(morgan("dev"));
app.use(express.json()); // tell express to work with JSON

// routes
app.use("/api/contacts", routerContacts);

app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// error handling
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  }
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal server error" });
});

module.exports = app;