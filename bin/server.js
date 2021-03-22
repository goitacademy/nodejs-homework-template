const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = require('../app')

const PORT = process.env.PORT || 3000
const DB_HOST = process.env.DB_HOST

const connection = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
