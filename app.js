const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config() // для того, чтоб можно было использовать переменные окружения

const userRouter = require('./routes/api/user')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// const email = {
//   to: 'hipsonomli@vusra.com',
//   from: 'juliavladomira@gmail.com',
//   subject: 'Новая заявка с сайта',
//   html: '<p>Здравствуйте, ваша заявка принята<p>',
// }
// sgMail
//   .send(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message))

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/users', userRouter)
app.use('/api/contacts', contactsRouter)

app.use(express.static('public'))

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
