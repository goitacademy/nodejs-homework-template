const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()
// const { DB_HOST } = process.env

// const { Schema, model } = mongoose

// const contactSchema = Schema({
//   name: String,
//   email: String,
// })

// const Contact = model('contact', contactSchema)
// const newContact = {
//   name: 'Inna',
//   email: 'inna@i.ua',
// }
// mongoose
//   .connect(DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     Contact.create(newContact, (error, data) => {
//       console.log(error)
//       console.log(data)
//     })
//   })
//   .catch((error) => {
//     console.log(error.message)
//   })
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
// api/contact
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
