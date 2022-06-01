const app = require('../app')
const db = require('../model/db')

require('dotenv').config()

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await db()
    app.listen(PORT, () => {
      console.log('\x1b[32m%s\x1b[0m',
        `Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m',
        `Server not running. Error message: ${error.message}`)
  }
}

start()
