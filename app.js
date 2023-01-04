// const DB_HOST = "mongodb+srv://Natali:7WKMdskWh0ud0ypj@cluster0.z065a32.mongodb.net/contacts_reader?retryWrites=true&w=majority"

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
// const multer = require('multer');
// const patch = require('patch')


require("dotenv").config();

const authRouter = require('./routes/api/auth');

const usersRouter = require('./routes/api/users')

const contactsRouter = require('./routes/api/contacts');

const {auth} = require('./middlewares')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

app.use('/api/auth', authRouter);
app.use('/api/users',auth, usersRouter);
app.use('/api/contacts',auth, contactsRouter);

app.use((req, res) => {
  return res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message })
})

module.exports = app
