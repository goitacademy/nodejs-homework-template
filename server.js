const mongoose = require('mongoose');

const app = require('./app');



// const DB_HOST = "mongodb+srv://yevdokymenkodn:170287@cluster0.bf09pl4.mongodb.net/db-contacts?retryWrites=true&w=majority"

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect("mongodb+srv://yevdokymenkodn:170287@cluster0.bf09pl4.mongodb.net/db-contacts?retryWrites=true&w=majority")
  .then(() => {
    app.listen(PORT);
    console.log('Database connection successful');
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });