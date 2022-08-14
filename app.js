const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config();
const contactsRouter = require('./routes/api/contacts')
const morgan = require('morgan')
const app = express()
const usersRouter = require('./routes/api/users')
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.use('/api/users',usersRouter)
app.use('/api/contacts', contactsRouter)
app.use(morgan("tiny"))
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message ="Server error" } = err
  res.status(status).json({ message })
})


// const ws = require("ws")
// const wsServer = new ws.Server({port: 3000})






module.exports = app
