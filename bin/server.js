
const app = require('../src/app')
const db = require('../src/db')
const mkFolder = require('../src/helpers/mkFolder')
const { UPLOADS, AVATARS } = require('../src/helpers/uploadPath')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, async () => {
    await mkFolder(UPLOADS)
    await mkFolder(AVATARS)

    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(error => {
  console.error(`Server not running. Error message: ${error.message}`)
})