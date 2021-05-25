const mongoose = require('mongoose')

function dbConnection() {
  mongoose.connect(
    'mongodb+srv://GoTI-Serebrennikov:239572@cluster0.8vfmu.mongodb.net/db-contacts?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    err => {
      if (err) {
        console.log('err :', err)
        process.exit(1)
      }

      if (!err) {
        console.log('Database connection successful!')
      }
    },
  )
}

module.exports = dbConnection
