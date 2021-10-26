const { connect } = require('mongoose')

const connectDB = async() => {
  await connect(process.env.DB_HOST)
}

module.exports = { connectDB }
