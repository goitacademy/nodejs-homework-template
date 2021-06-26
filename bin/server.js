const app = require('../app')
require('dotenv').config()
const { connectMongo } = require('../db/connections')
const PORT = process.env.PORT || 3030

const start = async () => {
  try {
    await connectMongo().then(console.log('Database connection successful')).catch(err => console.log('Error occured during connection to db', err.message))

    app.listen(PORT, (err) => {
      if (err) console.error('Error at aserver launch:', err)
      console.log(`Server works at port ${PORT}!`)
    })
  } catch (err) {
    console.error(`Failed to launch application with error: ${err.message}`)
  }
}

start()
