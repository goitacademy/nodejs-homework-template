const mongoose = require('mongoose')

mongoose.set("strictQuery", false);
const connectMongo = async () => { // await
  return mongoose.connect(process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
}

module.exports = {
  connectMongo
}