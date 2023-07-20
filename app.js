const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
 
const usersRouter = require("./routes/api/users");
const contactsRouter = require('./routes/api/contacts')

dotenv.config()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use("/api/users", usersRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// app.use((error, req, res, next) => {
//   const {status = 500, message = "Server error"} = error;
//   res.status(status).json({ message })
// })

app.use((error, req, res, next) => {
  const {status = 500, message = "Server error"} = error;
  res.status(status).json({ message, stack: error.stack })
})


module.exports = app
