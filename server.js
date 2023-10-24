const app = require('./app')
const mongoose = require('mongoose');

const DB_HOST = 'mongodb+srv://Nikolay:JYJACSvjyhaDmtPs@cluster0.mdy9a4n.mongodb.net/db-contacts?retryWrites=true&w=majority'

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
    console.log('Server started');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

