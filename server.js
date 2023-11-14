const app = require('./app')

// RnbmTjkUhEKh8QpQ
const mongoose = require('mongoose')
const DB_HOST = 'mongodb+srv://Nik:RnbmTjkUhEKh8QpQ@cluster0.ipbnpbn.mongodb.net/contacts_reader'
// const {DB_HOST} = require('./config')
mongoose.connect(DB_HOST)
.then(() => 
app.listen(3000, () => {
  console.log("Database connection successful")
})
)
.catch(error => {
  console.log(error.message)
  process.exit(1)
})




