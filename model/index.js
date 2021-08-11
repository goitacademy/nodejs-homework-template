// const { v4 } = require('uuid')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const { DB_HOST } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Database connection successful'))
  .catch(error => console.log(error))
