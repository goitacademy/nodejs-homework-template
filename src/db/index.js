const mongoose = require("mongoose")
require("dotenv").config()

const DB_HOST = process.env.DB_HOST

const db = mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

mongoose.connection.on("connected", () => {
  console.log("Database connection successful")
})

mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${error.message}`)
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected")
})

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Connection for DB disconnected and app terminated")
    process.exit(1)
  })
})
module.exports = db
