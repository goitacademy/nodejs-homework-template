const mongoose = require('mongoose')

const DB_HOST =
  'mongodb+srv://Anastasiia:LzRDdhyqPE5uHF7s@cluster0.87ml8.mongodb.net/phonebook?retryWrites=true&w=majority'

mongoose
  .connect(DB_HOST)
  .then(console.log('Database connection successful'))
  .catch(err => console.error(err))
