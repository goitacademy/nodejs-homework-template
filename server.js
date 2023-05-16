const mongoose = require('mongoose');

const app = require('./app');

const DB_HOST =
  'mongodb+srv://IhorS:7ujqYsarsTXO7urI@cluster0.eornbn9.mongodb.net/db-contacts?retryWrites=true&w=majority';
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Database connnection successful');
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
