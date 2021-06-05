const app = require('../app')
const db = require('../model/db')
const createFolderIsNotExist = require('../helpers/create-dir')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const UPLOAD_DIR = process.env.UPLOAD_DIR
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
// запускаем сервер после того, когда наша БД законнектилась
db.then(() => {
  app.listen(PORT, async () => {
    await createFolderIsNotExist(UPLOAD_DIR)
    await createFolderIsNotExist(AVATARS_OF_USERS)
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error message ${err.message}`)
  process.exit(1)
})
