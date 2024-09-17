const app = require('./app')
const mongoose = require("mongoose")
const {DB_HOST, PORT} = process.env // it is for deploy to render.com

mongoose.connect(DB_HOST)
mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST, PORT)
.then(() => {
  app.listen(PORT)
  console.log("Server running. Use our API on port: 3000")
  console.log("Database connection successful")
})
.catch(error => {
  console.log(error.message)
  process.exit(1)
})

