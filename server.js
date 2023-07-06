const app = require('./app')

const mongoose = require('mongoose')
const DB_HOST = 'mongodb+srv://Yulia:GX8OVh82Qbiqe3gN@cluster0.kyn9nif.mongodb.net/contacts_reader?retryWrites=true&w=majority'

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

