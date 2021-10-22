
const db = require('../config/db')
const app = require('../app')
require('dotenv').config()
const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATAR_OF_USERS = process.env.AVATAR_OF_USERS
const mkdirp = require('mkdirp')

const PORT = process.env.PORT || 8080

db.then(() => {
  app.listen(PORT, async () => {
    await mkdirp(UPLOAD_DIR)
    await mkdirp(AVATAR_OF_USERS)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not run. Error: ${err.message}`)
})