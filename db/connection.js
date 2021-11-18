const mongoose = require('mongoose')

const connectMongo = async() => {
  return mongoose.connect('mongodb+srv://danek:danek1994@cluster0.rjq1f.mongodb.net/db-contacts?retryWrites=true&w=majority')
}
module.exports = { connectMongo }
