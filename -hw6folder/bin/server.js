const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connect success. Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
