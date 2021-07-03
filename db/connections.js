const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const connectMongo = async () => {
  return mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

module.exports = {
  connectMongo,
}
