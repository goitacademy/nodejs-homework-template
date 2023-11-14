const app = require('./app')

// RnbmTjkUhEKh8QpQ
// console.log(process.env)
const mongoose = require('mongoose')
// const DB_HOST = 'mongodb+srv://Nik:RnbmTjkUhEKh8QpQ@cluster0.ipbnpbn.mongodb.net/contacts_reader?retryWrites=true&w=majority'

const {DB_HOST, PORT=3000} = process.env
mongoose.connect(DB_HOST)
.then(() => 
app.listen(PORT, () => {
  console.log("Database connection successful")
})
)
.catch(error => {
  console.log(error.message)
  process.exit(1)
})




