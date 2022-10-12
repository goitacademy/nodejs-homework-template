const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const fs = require('fs/promises')
const moment = require('moment')


const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use(async (req, res, next) =>{
  const {url, method} = req;
  const data = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("server.log", `\n${method} ${url} ${data}`)
  next()
})

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message})
  next();
})

module.exports = app
