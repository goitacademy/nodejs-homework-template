const app = require('./app');

const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://Elena:GlSnjjtUyfQO5HqM@cluster0.lmairny.mongodb.net/db-contacts?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.mesage);
    process.exit(1);
  })

