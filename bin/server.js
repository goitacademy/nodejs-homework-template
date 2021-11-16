const app = require('../app')

const PORT = process.env.PORT || 4321

app.listen(PORT, err => {
  if (err) console.error('Error at server Launch:', err)
  console.log(`Server running. Use our API on port: ${PORT}`)
})
