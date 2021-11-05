const mongoose = require('mongoose')

const app = require('../app')

const { PORT = 3000, DB_HOST } = process.env

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.masage)
    process.exit(1)
  })
