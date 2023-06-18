const mongoose = require('mongoose');

const app = require('./app')


const DB_HOST = "mongodb+srv://Nika:IiCKTfi0BNf61jtB@cluster0.dcvhfty.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
.then(()=> {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1)
})

