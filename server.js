const app = require('./app')
const mongoose = require('mongoose');

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

const DB_HOST = 'mongodb+srv://Nik:cWvpQY1qQUUF2SXT@cluster0.0e5jsvn.mongodb.net/Contacts_reader?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)
mongoose.connect(DB_HOST)
  .then(()=> {app.listen(3000)})
  .catch(error => {console.log(error.message); process.exit(1)})
