const app = require('./app')
const mongoose = require("mongoose")
const DB_HOST = "mongodb+srv://Sergey:6aW8ACM88Ob9FowD@cluster0.v3b1qey.mongodb.net/db-contacts"
mongoose.connect(DB_HOST)
mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
  console.log("Server running. Use our API on port: 3000")
})
.catch(error => {
  console.log(error.message)
  process.exit(1)
})

// console.log("Server running. Use our API on port: 3000")