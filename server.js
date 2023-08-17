const mongoose = require('mongoose');

const app = require('./app');

// const DB_HOST = 'mongodb+srv://user_24:x2fiWo32LJ257GCR@cluster0.zzgsa5u.mongodb.net/Contacts_list?retryWrites=true&w=majority';
// const DB_HOST = 'mongodb+srv://user_24:x2fiWo32LJ257GCR@cluster0.zzgsa5u.mongodb.net/Contacts_list';

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
