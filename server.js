const app = require('./app')
const mongoose = require('mongoose');

const  DB_HOST  = "mongodb+srv://Iurii:4nNmBE6Ifqh5ixAr@cluster0.6kqr9mm.mongodb.net/db-contacts?retryWrites=true&w=majority"
// mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
