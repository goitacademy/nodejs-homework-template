const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

// zmiany
app.listen(3000, () => {
  console.log("Example app is working on port 3000!")
})

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
  // console.log("Hej, hej, middleware")
  // res.send("Hej, hej")
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
