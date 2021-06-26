const app = require('../app')
require('dotenv').config()
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000

const start = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`)
  })
}
start()
