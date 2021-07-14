const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3000

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

const { connectMongo } = require('./src/db/connection')
const { contactsRouter } = require('./src/routers/contactsRouter')
const { authRouter } = require('./src/routers/authRouter')
const { errorHandler } = require('./src/helpers/apiHelpers')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(express.static('public'))
app.use(logger(formatsLogger))
app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
app.use(errorHandler)

const start = async () => {
  try {
    await connectMongo()
      .then(console.log('Database connection successful'))
      .catch(err => {
        console.log('Some error occurred during connection to db.', err.message)
        process.exit(1)
      })
    app.listen(PORT, err => {
      if (err) console.log('Error at server launch', err)
      console.log(`Server running on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Something went wrong. ${err.message}`)
  }
}

start()
