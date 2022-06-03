const app = require('../src/app')
const db = require('../src/db')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(error => {
  console.error(`Server not running. Error message: ${error.message}`)
})