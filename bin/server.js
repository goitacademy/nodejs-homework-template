const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const app = require('../app')

const {DB_HOST} = process.env

const PORT = process.env.PORT || 5000

mongoose
  .connect(DB_HOST
    , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful")
    })
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })





