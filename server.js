const mongoose = require('mongoose');

const app = require('./app')

const DB_HOST = "mongodb+srv://Inna:Inna1331@cluster0.oziga34.mongodb.net/db_contacts?retryWrites=true&w=majority"
mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
  app.listen(3000) 
  console.log("Database connection successful")
  })
  .catch((error) => {
    console.log(error.mesage);
    process.exit(1);
  });



