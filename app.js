const express = require('express')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((_, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

module.exports = app;
