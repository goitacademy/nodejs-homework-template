const mongoose = require("mongoose");

const app = require('./app');

const DB_HOST = "mongodb+srv://Alina:imQU28KRraUX1hj3@cluster0.iydfcnl.mongodb.net/?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
}) 


