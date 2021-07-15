const app = require('../app')

const mongoose = require('mongoose')
require('dotenv').config()

const { DB_HOST } = process.env
const PORT = process.env.PORT || 3000

const connection = mongoose.connect(DB_HOST, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Port: ${PORT}`)
      console.log('Database connection successful!')
    })
  })
  .catch(err => {
    console.log(`Server not running. ${err.message}`)
    process.exit(1)
  })
