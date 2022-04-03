const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose
  .connect(
    'mongodb+srv://kamilWitkowski123:testtest123@cluster0.wbiy6.mongodb.net/db-contacts'
  )
  .then(() => console.log('Database connection successful'))
  .catch((err) => {
    console.log('err', err)
    process.exit(1)
  })

const Schema = mongoose.Schema

module.exports = Schema
