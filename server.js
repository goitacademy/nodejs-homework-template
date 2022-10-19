const app = require('./app')

const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://Alex:kexUF9DxZ60eLxJr@cluster0.aeux44q.mongodb.net/contacts_reader?retryWrites=true&w=majority';
const PORT = 3000;

mongoose.connect(DB_HOST).then(() =>{
  console.log('Database connection successful');
  app.listen(PORT)
}).catch(error => {
  console.log(error.message);
  process.exit(1)
})


