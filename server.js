const mongoose = require('mongoose');
const app = require('./app')
const { DB_HOST } = process.env

mongoose.set('strictQuery', false)

mongoose.connect(DB_HOST, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000)
    console.log("Database connected")
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })





