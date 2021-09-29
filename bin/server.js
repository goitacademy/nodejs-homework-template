const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = require('../app')

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => app.listen(PORT))
.catch(error => {
  console.log(error.message)
  process.exit(1)
})

const {DB_HOST, PORT= 3000} = process.env
