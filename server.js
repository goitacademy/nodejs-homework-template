require('dotenv').config()
const app = require('./src/app')
const { connectMongo } = require('./src/db/connection')

const PORT = 3000

const start = async () => {
  try {
    await connectMongo();
  
    app.listen(PORT, (err) => {
      if(err) return console.log('Error at server launch:', err.message)
      console.log('Server running. Use our API on port: 3000')
    })
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`)
  }
}

start()
