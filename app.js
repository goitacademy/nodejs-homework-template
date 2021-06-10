const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const limiter = require('./helpers/limiter');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
const boolParser = require("express-query-boolean");
const helmet = require("helmet");
const path = require('path');

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(helmet());

require('dotenv').config();
const PUBLIC_DIR = process.env.PUBLIC_DIR;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

app.use(express.static(path.join(__dirname, PUBLIC_DIR, AVATARS_OF_USERS)));

app.use(limiter);
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json({limit: 15000}))
app.use(boolParser())

app.use('/api/users', usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ status:"error",code: 404, message: 'Not found' })
})

app.use((err, req, res, next) => {
  const code = err.status || 500;
  const status = err.status ? "error" : "fail";
  res.status(code).json({ status, code, message: err.message })
})

module.exports = app
