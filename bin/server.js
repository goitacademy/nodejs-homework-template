import app from '../app';
import db from '../lib/db'
// import dotenv from 'dotenv'

const PORT = process.env.PORT || 3000

// dotenv.config({path: './config/.env'})

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}).catch((err) => {
  console.log(`Server not running. Error: ${err.message}`);
})
