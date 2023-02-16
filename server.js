const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const PORT = 3000;
mongoose.set('strictQuery', false);
mongoose
  .connect(
    'mongodb+srv://yevdokymenkodn:170287@cluster0.bf09pl4.mongodb.net/db-contacts?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
