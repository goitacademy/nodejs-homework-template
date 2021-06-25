const mongoose = require('mongoose')

const mongoUrl = process.env.DB_HOST

const connectMongo = async () => {
  return mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
module.exports = {
  connectMongo,
}
