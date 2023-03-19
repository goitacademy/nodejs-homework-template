const express = require('express');
const cors = require('cors');

const contactsRouter = require('./routes/api/contactsRoutes')
const app = express()

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
