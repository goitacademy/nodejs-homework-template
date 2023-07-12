const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((error, req, res, next) => {
  const {status = 500, message = "Server error"} = error;
  res.status(status).json({ message })
})




// const contacts = require("./models/contacts.json")

// app.get("/", (request, response)=> {
//   response.send("<h2>Home page</h2>")
// });

// app.get("/contacts", (req, res)=> {
  
//   res.json(contacts)
// })

module.exports = app
