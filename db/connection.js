const mongoose = require('mongoose')

function dbConnection() {
  mongoose.connect(
    'mongodb+srv://node:password123PASSWORD@cluster0-b5zb1.mongodb.net/db-contacts?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.log('err :', err)
        process.exit(1)
      }

      if (!err) {
        console.log('Database connection successful!')
      }
    }
  )
}

module.exports = dbConnection
