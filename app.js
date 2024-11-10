const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(express.json())
app.use(cors())
app.use(logger(formatsLogger))



app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: `Not found - ${req.path}` })
})

app.use((err, req, res, next) => {
  console.log(err.name)
  if(err.name === 'CastError'){
    return res.status(400).json({ message: err.message })
  }
  res.status(500).json({ message: err.message })
})

module.exports = app
