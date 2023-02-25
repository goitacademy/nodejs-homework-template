const app = require('./app');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose
  .connect(
    'mongodb+srv://Tvinlee:lSnidN4VAebBsDqN@cluster0.rqfgtfx.mongodb.net/db-contacts?retryWrites=true&w=majority'
  )
  .then(() => {
    app.listen(3000);
    console.log('database connect sucsess');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
