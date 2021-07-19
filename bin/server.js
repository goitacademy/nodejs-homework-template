const app = require('../app')

const db = require('../db/connect-mongoose')

require('dotenv').config()

const { PORT = 3000 } = process.env

db.then(() => {
  console.log('Database connection successful')
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => {
  console.log(`Server not running. Error message:${error.message}`)
})
