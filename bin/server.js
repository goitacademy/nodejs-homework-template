const app = require('../app')
const db = require('../model/db')
const createFolderIfNotExists = require('../model/helpers/createDir')
const PORT = process.env.PORT || 3000

db
  .then(() => {
    app.listen(PORT, () => {
      const UPLOAD_DIR = process.env.UPLOAD_DIR
      const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
      createFolderIfNotExists(UPLOAD_DIR)
      createFolderIfNotExists(AVATARS_OF_USERS)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  }).catch((err) => {
    console.log(`There is ${err}`)
    process.exit(1)
  })
