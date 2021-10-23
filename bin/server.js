const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful')
    app.listen(PORT)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
