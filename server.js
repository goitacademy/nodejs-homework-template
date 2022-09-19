const app = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || 3333

app.listen(PORT, (err) => {
  if (err) console.error('Error at server launc:', err)
  console.log(`Server running. Use our API on port: ${PORT}`)
})
