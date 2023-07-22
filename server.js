const app = require('./app')
const mongoose = require('mongoose')
const { MONGO_URL, PORT } = require('./constant')

const connection = mongoose.connect(MONGO_URL)

connection
  .then(() => {
    console.log('Database connection successful')

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
