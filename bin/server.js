const app = require('../app')
require('dotenv').config()
const PORT = process.env.PORT || 3000
const { connectMongo } = require('../src/db/connection')

const start = async () => {
  try { 
  await connectMongo()
  console.log("Database connection successful")
  app.listen(PORT, (err) => {
    if (err) { console.error("Server failed:", err) }
    console.log(`Server running. Use our API on port: ${PORT}`)
})
  } catch (err) {
    console.error("Database connection failed:", err)
    process.exit(1)
  }
}

start();