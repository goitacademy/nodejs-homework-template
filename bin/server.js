const app = require('../app')

const PORT = process.env.PORT || 4002

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
