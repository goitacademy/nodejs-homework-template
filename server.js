const app = require('./app')
require('dotenv').config()
const mongoose = require("mongoose")


const { DB_HOST, PORT = 3333 } = process.env

mongoose.connect(DB_HOST).then(() => app.listen(PORT, (err) => {
  if (err) console.error('Error at server launc:', err)
  console.log(`Server running. Use our API on port: ${PORT} Database connection successful`)
}))
  .catch(err => {
    console.log(err.message)
    process.exit(1)
  })

