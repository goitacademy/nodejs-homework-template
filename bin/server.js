const app = require('../app')
const { connectDB } = require('../config/db')
require('colors')

const PORT = process.env.PORT || 3000
const { NODE_ENV } = process.env

connectDB()

const server = app.listen(PORT, () => {
  console.log(` Server running on port: ${PORT} in ${NODE_ENV} mode `.cyan.bgWhite)
})
process.on('unhandledRejection', (err, _) => {
  console.log('Error:', err.message)
  server.close(() => process.exit(1))
})
