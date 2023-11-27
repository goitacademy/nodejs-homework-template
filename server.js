const app = require('./app')

const mongoose = require('mongoose')
const DB_HOST =
  "mongodb+srv://vitaliybeyar:7jZ2hPKRHZ7Oe1Dv@cluster0.tnlyzg7.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {app.listen(3000)})
  .catch(err => {
    console.log(err.message);
    process.exit(1);

  });

