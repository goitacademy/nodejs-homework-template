const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()
const { connectMongo } = require('./src/db/connection')
//= ==============================
const contactsRouter = require('./src/routes/api/contacts')

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
  res.status(500).json({ message: err.message })
})

//= ======================================

const PORT = process.env.PORT || 4040
const start = async () => {
  try {
    await connectMongo()

    app.listen(PORT, (err) => {
      if (err) console.error('Error at aserver launch:', err)
      console.log(`Server works at port ${PORT}!`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
  }
}
start()

module.exports = app
