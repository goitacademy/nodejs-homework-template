const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST } = process.env;


mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Success database connect');
    app.listen(3000, () => {
      console.log(
        'Server running. Use our API on port: 3000'
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// ElenaS
// my_contacts
// const DB_HOST =
//   'mongodb+srv://ElenaS:ElenaS@cluster0.bvddp7k.mongodb.net/my_contacts?retryWrites=true&w=majority';
