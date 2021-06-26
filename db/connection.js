const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const connectMongo = async () => {
  return mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = {
  connectMongo,
}
