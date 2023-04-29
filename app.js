/* eslint-disable no-unused-vars */
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const contactsRouter = require('./routes/api/contacts')

const app = express()
// const DB_HOST = "mongodb+srv://Taras:6CvOkgQ0ZUFvdtiG@db-contacts.vcilqda.mongodb.net/test"
// mongoose.connect()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
