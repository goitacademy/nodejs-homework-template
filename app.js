const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()


const app = express()

const {HOST_DB} = process.env;
mongoose.connect(HOST_DB).then(res => {
  console.log("Database connection successful");

  app.listen(5000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

const contactsRouter = require('./routes/api/contacts');
const authRouter = require('./routes/api/auth');

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/user", authRouter )
app.use('/api/contacts', contactsRouter);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found'})
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
