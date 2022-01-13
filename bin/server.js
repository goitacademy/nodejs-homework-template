<<<<<<< Updated upstream
const app = require('../app')
=======
import app from '../app';
import db from '../lib/db'
>>>>>>> Stashed changes

const PORT = process.env.PORT || 3000

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`);
})
