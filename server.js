const mongoose = require('mongoose');
const app = require('./app')

const DB_HOST = "mongodb+srv://Lindelof:Aaxo5rDb1ZHEqFEm@cluster0.hpkn1k8.mongodb.net/contacts_reader?retryWrites=true&w=majority";

// const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => app.listen(3000))
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })