const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })

const contactsRouter = require('./routes/contactsApi/contacts')
const authRouter = require('./routes/authApi/auth')

// Init application
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// Middlewares
app.use(logger(formatsLogger))
app.use(cors()) // enable cors
app.use(express.json()) // json body parse

// Mounts routers
app.use('/api/v1/contacts', contactsRouter)
app.use('/api/v1/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
