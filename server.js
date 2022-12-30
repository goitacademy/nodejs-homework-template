require('dotenv').config()
const app = require('./src/app')
const { connectMongo } = require('./src/db/connection')

const PORT = 3000

const start = async () => {
  try {
    await connectMongo();
  
    app.listen(PORT, () => {
      console.log('Database connection successful')
    })
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`)
    process.exit(1);
  }
}

start()
