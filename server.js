const mongoose = require('mongoose')

const app = require('./app')

const DB_HOST = "mongodb+srv://PavMor:Sobolivka1@cluster0.gydk4zo.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


