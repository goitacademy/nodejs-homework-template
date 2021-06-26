const { connectMongo } = require('../db/connection')
const app = require('../app')

const PORT = process.env.PORT || 3000

const start = async () => {
  try {
    await connectMongo()
      .then(console.log('Database connection successful'))
      .catch(err => {
        console.log('Some error occurred during connection to db.', err.message)
        process.exit(1)
      })
    app.listen(PORT, err => {
      if (err) console.log('Error at server launch', err)
      console.log(`Server running on port: ${PORT}`)
    })
  } catch (err) {
    console.error(`Something went wrong. ${err.message}`)
  }
}

start()
