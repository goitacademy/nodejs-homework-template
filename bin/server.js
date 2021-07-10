const app = require('../app')
const db = require('../db/db')
const path = require('path')
const { createFolderIsNotExist } = require('../helpers/createFolder')

require('dotenv').config()
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((error) => console.log(`Error: ${error.message}`))
