const app = require('./app')
const setupMongoConnection = require('./utils/setupMongoConnection')
const { PORT } = process.env

const startServer = async () => {
  await setupMongoConnection();
  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Problem with connection:${err}`)
      return
    }
    console.log(`Server running. Use our API on port: ${PORT}`)
})
}

startServer()

module.exports = startServer

