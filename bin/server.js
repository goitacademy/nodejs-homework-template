const app = require('../app')
require('dotenv').config()
const mongoose = require('mongoose')

const { DB_HOST, PORT = 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
console.log('Database connection successful'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch(error => { console.log(error); process.exit(1) })
