const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST =
   'mongodb+srv://antonzv2002:qsVhBH29nflqW7Zt@cluster0.qbd0vzv.mongodb.net/contacts_collection?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
   .connect(DB_HOST)
   .then(() => {
      app.listen(3000);
   })
   .catch(error => {
      console.log(error.message);
      process.exit(1);
   });
