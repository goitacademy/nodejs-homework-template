import app from '../app'
import db from '../lib/db'
// import { colors } from '../helpers'

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
    // console.log(`Server running. Use our API on port: ${PORT}`.yellow)
  })
}).catch((err) => {
  console.log(`Server is not running.Error ${err.message}`)
  // console.log(`Server is not running.Error ${err.message}`.orange)
})
