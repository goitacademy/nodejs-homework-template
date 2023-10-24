const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const contactsRouter = require('./routes/api/contactRouter')
const usersRouter = require('./routes/api/userRouter')

dotenv.config()

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users/', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Не знайдено' })
})

app.use((err, req, res, next) => {
  const {status=500, message="Помилка серверу"}=err
  res.status(status).json({ message })
})

module.exports = app
