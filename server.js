const app = require('./app')
const mongoose = require("mongoose");



const DB_HOST = "mongodb+srv://kseniafihas:wzeHitRqZ7hp5Lg4@cluster0.ze08jaq.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  })