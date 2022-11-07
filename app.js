const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const {Types} = require('mongoose')

const contactsRouter = require('./routes/api/contacts')


const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  if (!Types.ObjectId.isValid(req.params.id)) res.status(404).json({message: "Not found"})
  res.status(500).json({ message: err.message })
})

module.exports = { app }
