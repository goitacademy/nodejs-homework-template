const app = require('./app')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000
const uriDb = process.env.URI_DB

mongoose.connect(uriDb)
  .then(() => {
    app.listen(PORT)
    console.log("Database connection successful")
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })