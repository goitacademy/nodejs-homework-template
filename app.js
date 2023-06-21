const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv=require('dotenv')

const contactsRouter = require('./routes/api/contacts')
const authRouter=require('./routes/api/auth')

dotenv.config()
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/users',authRouter)
app.use('/api/contacts', contactsRouter)

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message});
})

module.exports = app

// app.listen(3001)
