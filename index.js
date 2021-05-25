require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')

const dbConnection = require('./db/connection')
const router = require('./router/router')
const errorsHandler = require('./middlewares/errors')
const notFound = require('./middlewares/notFound')

const port = process.env.PORT || 5000
const isDev = process.env.NODE_ENV === 'development'

if (isDev) app.use(logger('dev'))

dbConnection()

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', function(req, res) {
  res.send('DataBase of Contacts')
})

app.use(router)
app.use('*', notFound)
app.use(errorsHandler)

app.use('*', (req, res) => {
  res.status(404).json({
    get_contacts: 'http://localhost:5000/api/contacts',
    create_contacts: 'http://localhost:5000/api/contacts',
    find_contact: 'http://localhost:5000/api/contacts/:contactId',
    delete_contacts: 'http://localhost:5000/api/contacts/:contactId',
    update_contacts: 'http://localhost:5000/api/contacts/:contactId',
  })
})

app.listen(port, () => {
  console.log(`Server started on ${port}`)
})
