const mongoose = require('mongoose')

const app = require('./app')

const { DB_HOST } = process.env

const PORT = 3000

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log(`Database connection successful at port:${PORT}`)
    app.listen(PORT || 3000)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
