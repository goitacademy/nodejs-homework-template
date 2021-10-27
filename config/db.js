const { connect } = require('mongoose')

const connectDB = async() => {
  const db = await connect(process.env.DB_HOST)
  console.log(`MongoDB connected: DB_NAME: ${db.connection.name}, Cluster: ${db.connection.host}`.magenta)
}

module.exports = { connectDB }
