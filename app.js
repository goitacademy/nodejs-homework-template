const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const { createFileStorage } = require('./middlewares/createFileStorage')
const { IMAGE_DIR } = require('./helpers/contactsHelper')

const usersRouter = require('./routes/api/users')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const upload = createFileStorage(IMAGE_DIR)
app.use(logger(formatsLogger))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/users', upload.single('avatar'), usersRouter)
app.use('/api/contacts', contactsRouter)
app.use('/avatars', express.static('public/avatars'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
