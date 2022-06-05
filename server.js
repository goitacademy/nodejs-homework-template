const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
