const db = require('../db/db')
const app = require('../app')

const PORT = process.env.PORT || 3000
db.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful. Use our API on port: ${PORT}`)
  })
}).catch(err => {
  console.log(`Server cant run. Error message: ${err}`)
})

