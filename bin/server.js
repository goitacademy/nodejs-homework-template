const app = require('../app')
const { connectDB } = require('../config/db')
require('../helpers')

const PORT = process.env.PORT || 3000
const { NODE_ENV } = process.env

// Connect Database
connectDB()

const server = app.listen(PORT, () => {
  console.log(` Server running on port: ${PORT} in ${NODE_ENV} mode `.cyan.bold.bgWhite)
})
process.on('unhandledRejection', (err, _) => {
  console.log('Error:'.red, err.message.red.italic)
  server.close(() => process.exit(1))
})
