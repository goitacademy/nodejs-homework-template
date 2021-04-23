const db = require('../model/db')
const app = require('../app')

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch(err => {
  console.log(`The server is not running. Error message: ${err.message}`)
})
