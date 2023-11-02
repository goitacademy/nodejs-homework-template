const app = require('./app')

const mongoose = require('mongoose');

const DB_HOST = "mongodb+srv://alessastark:fMuKybob3QcYbqdi@cluster0.eo0gpmj.mongodb.net/contacts_reader?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
  console.log("Database connection successful")
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
});
