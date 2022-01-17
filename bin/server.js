const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = require('../app')

const DB_HOST = process.env.DB_HOST
const PORT = process.env.PORT

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
    })
  })
  .catch((error) => {
    console.log(`Mongoose connection error: ${error.message}`)
    process.exit(1)
  })
