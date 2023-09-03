const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'
const logger = require('morgan')
app.use(logger(formatsLogger))

require("./config/passport");

const router = require('./api')
app.use('/api', router)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

const PORT = process.env.PORT || 3000
const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  dbName: 'db-contacts',
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}\nDatabase connection successful`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1);
  })

module.exports = app