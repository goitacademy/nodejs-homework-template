const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// const contactsRouter = require('./routes/api/contacts')

const app = express()

// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// app.use(logger(formatsLogger))
// app.use(cors())
app.use(express.json())

// app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message })
// })




app.get('/', (req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.send('<h2>Home page</h2>')
});


const contacts = require('./models/contacts.js')

app.get('/contacts', (req, res) => res.send(contacts));







module.exports = app




