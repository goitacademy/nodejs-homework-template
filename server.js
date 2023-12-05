const app = require('./app')
const mongoose = require("mongoose")
require("dotenv").config()

app.listen(3000, () => {
  mongoose.connect(
    process.env.CONNECTION_MONGODB
  )
  .then(() => console.log('Connected!'));
  console.log("Server running. Use our API on port: http://localhost:3000")
})
