const mongoose = require('mongoose');
const express = require('express');
// const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const router = require('./api/index');

const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
});

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

console.log(`PORT: ${process.env.PORT}`);

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
.then(() => {
  app.listen(PORT, function() {
    console.log("Database connection successful")
  })
})
.catch((err) =>
console.log(`Server not running. Error message: ${err.message}`),
);