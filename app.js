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

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app

// const express = require('express');
// const app = express();
const http = require ('http'); 
const hostname = '127.0.0.1'; 
const port = 3000; 
const server = http.createServer ((req, res) => {
  res.statusCode = 200; res.setHeader ('Content-Type', 'text / plain'); 
  res.end ('Hello World');}) ; server.listen (port, hostname, () => {
    console.log (`Сервер работает по адресу http: // ${hostname}: ${port} /`);});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

