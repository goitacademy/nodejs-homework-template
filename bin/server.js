const app = require('../app')
require('dotenv').config()
const { connectMongo } = require('../db/connection')

const PORT = process.env.PORT || 3001

const start = async () => {
  try {
    await connectMongo()
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log('server crushed')
    console.log(error.message)
  }
}

start()
