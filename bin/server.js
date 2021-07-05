const app = require('../app')
const path = require('path')
const db = require('../model/db')
const { createFoldereIsNotExist } = require('../helpers/foldersCreator')

const PORT = process.env.PORT
const UPLOAD_DIR = path.join(process.cwd(), process.env.UPLOAD_DIR)

db.then(() => {
  app.listen(PORT, async () => {
    await createFoldereIsNotExist(UPLOAD_DIR)
    console.log(`Server running. Use our API on port: ${PORT}`)
    console.log('Database connection successful')
  })
}).catch((error) => {
  console.log(`Server not running. Error message: ${error.message}`)
})
