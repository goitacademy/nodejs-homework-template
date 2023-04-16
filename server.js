const app = require('./app')
require('dotenv').config()

const {PORT} = process.env
const connection = require('./connectionDB/connectionDB')

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
