const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const contacts = require("./models/contacts.json");

const contactsRouter = require('./routes/api/contacts')

const app = express();   // aap -це веб сервер 

app.get('/contacts',(request,  response)=>{ response.send(contacts)});


app.listen(3002, ()=> console.log('server running1'))

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

module.exports = app
