const app = require('../app')
const { connectToMongo } = require('../db/connectionToMongo')

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  await connectToMongo()
  console.log(`Server running. Use our API on port: ${PORT}`)
})
