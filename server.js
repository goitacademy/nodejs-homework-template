const app = require('./app')

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
