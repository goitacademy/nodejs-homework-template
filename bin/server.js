const mongoose = require('mongoose')
const app = require('../app')
// const PORT = process.env.PORT || 3000
const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful`)
    })
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })

// 8pIUh0zIwX7HB0y3
