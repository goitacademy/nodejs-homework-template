const mongoose = require('mongoose')

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database connection successful')
  } catch (err) {
    console.log('ERROR in connection to mongo:', err.message)
    process.exit(1)
  }
}

module.exports = {
  connectToMongo
}
