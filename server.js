const mongoose = require('mongoose');

const app = require('./app');

const DB_HOST = 'mongodb+srv://user_24:x2fiWo32LJ257GCR@cluster0.zzgsa5u.mongodb.net/Contacts_list?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });


