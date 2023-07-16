const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

// const userRouter = require("./routes/api/users")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

// app.use('/api/users', userRouter)

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {

  const {status = 500,message = "Server error" }=err;
  res.status(status).json({ message: err.message })

  // res.status(500).json({ message: err.message })
})

module.exports = app
