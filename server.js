const mongoose = require('mongoose');



const app = require('./app');
const DB_HOST = "mongodb+srv://user:xvc0vCh6hSqpwiUh@cluster0.xgopkjp.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3001)
  console.log("Database connection successful");
})
.catch(error => {
console.log(error.message);
process.exit(1);
})

