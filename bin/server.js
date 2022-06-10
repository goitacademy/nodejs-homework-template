const mongoose = require('mongoose')
const app = require('../app')
require('dotenv').config()

const { PORT = 3000, MONGO_URL } = process.env

mongoose
  .connect(MONGO_URL)
  .then(() =>
    app.listen(PORT, () => {
      console.log('Database connection successful ')
    })
  )
  .then(() => {
    console.log(`Server is on ${PORT}`)
})
  .catch((error) => {
    console.log('error', error.message)
    process.exit(1)
  })