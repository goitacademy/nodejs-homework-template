const mongoose = require('mongoose')
const app = require('../app')
const dotenv = require('dotenv')
dotenv.config()

const { DB_HOST, PORT = process.env.PORT || 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  app.listen(PORT, () => {
    console.log('Database connection successful')
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
})
  .catch(error => {
    console.log(`Connection error: ${error}`)
    process.exit(1)
  })
