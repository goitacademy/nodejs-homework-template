const app = require('../app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const { DB_HOST } = process.env
const PORT = process.env.PORT || 3000

const connection = mongoose.connect(DB_HOST, {
  // promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
  // useFindAndModify: false,
})

connection
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error - ${err.message}`)
    process.exit(1)
  })
