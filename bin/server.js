const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')

const PORT = process.env.PORT || 3000
const DB_HOST = process.env.DB_HOST

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful. Server running. Use our API on port: ${PORT}`)
  })
}).catch(error => {
  console.log(error.message)
  process.exit(1)
})
