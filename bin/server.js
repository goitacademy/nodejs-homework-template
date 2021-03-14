const app = require('../app')
const dbContacts = require('../model/connection')
const createFolderIsExist = require('../helpers/create-dir')
require('dotenv').config()

const PORT = process.env.PORT || 3000

dbContacts
  .then(() => {
    app.listen(PORT, async () => {
      await createFolderIsExist(process.env.UPLOAD_DIR)
      await createFolderIsExist(process.env.AVATARS_OF_USERS)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
