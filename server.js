const app = require('./app');

const mongoose = require('mongoose');
const DB_HOST =
  'mongodb+srv://Kirill:vfe1z5zYITk7OFrh@cluster0.ny3rsag.mongodb.net/contacts_reader?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log(
        'Server running. Use our API link http://localhost:3000/api/contacts/ on port: 3000'
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
