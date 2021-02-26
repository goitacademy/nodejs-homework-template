const app = require('../app')
const dbContacts = require('../model/connection')

const PORT = process.env.PORT || 3000

dbContacts
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`)
    process.exit(1)
  })
