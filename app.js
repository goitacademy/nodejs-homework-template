const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

// const { DB_HOST } = process.env

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app

// const mongoose = require("mongoose");
// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const DB_HOST = require("./model/config");
// const dotenv = require("dotenv");
// dotenv.config();

// const { DB_HOST } = process.env;

// const app = express();
// app.use(cors());

// mongoose
//   .connect(DB_HOST)
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });
