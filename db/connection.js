const mongoose = require('mongoose')
const createError = require('http-errors')

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database connection successful')
  } catch (error) {
    createError(error)
    process.exit(1)
  }
}
connectMongo()
module.exports = { connectMongo }
