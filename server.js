const mongoose = require('mongoose');

const app = require('./app'); 
const e = require('express');

const DB_Host = "mongodb+srv://Ishtvan:Us3XPk10iJjh6ELN@cluster0.tg7suj0.mongodb.net/contacts_finder?retryWrites=true&w=majority"

mongoose.set('strictQuery', true);

mongoose.connect(DB_Host)
  .then(() => {
    app.listen(3000)
})
  .catch(error => {
    console.log(error.message);
    process.exit(1);
})
