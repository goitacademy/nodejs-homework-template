const app = require('./app')

// RnbmTjkUhEKh8QpQ
// console.log(process.env)
const mongoose = require('mongoose')
const DB_HOST = 'mongodb+srv://Nik:RnbmTjkUhEKh8QpQ@cluster0.ipbnpbn.mongodb.net/contacts_reader?retryWrites=true&w=majority'
// const {DB_HOST} = require('./config')
// const {DB_HOST} = process.env
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




