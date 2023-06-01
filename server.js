const app = require('./app')

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Kateryna:6252532katya@cluster0.d0lof7f.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
    })
  
