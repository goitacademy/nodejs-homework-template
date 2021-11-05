const app = require('../app')
require('dotenv').config()
const { PORT = 3000, DB_HOST } = process.env

// const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('DB connect success')
    app.listen(PORT, () => {
      console.log(`Server is running at PORT ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
