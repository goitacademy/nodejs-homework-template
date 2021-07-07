const mongoose = require('mongoose')

const connectMongo = async () => {
  return mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
}

module.exports = {
  connectMongo,
}
