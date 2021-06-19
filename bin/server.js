const app = require('../app')
const db = require('../model/db')

const PORT = process.env.PORT

db.then(() => {
  app.listen(PORT, function () {
    console.log(`Server running. Use our API on port: ${PORT}`)
    console.log('Database connection successful')
  })
}).catch((error) => {
  console.log(`Server not running. Error message: ${error.message}`)
})
