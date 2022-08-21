const express = require('express');
const mongoose = require("mongoose");
const logger = require('morgan');
const cors = require('cors');
require("dotenv").config();

const {DB_HOST} = process.env;

mongoose.connect(DB_HOST) 
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1); 
  })
 
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require("./routes/api/users");

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json())
app.use(logger(formatsLogger))
app.use(cors())

app.use('/api/contacts', contactsRouter)
app.use("/api/users", usersRouter)

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message })
})

module.exports = app
