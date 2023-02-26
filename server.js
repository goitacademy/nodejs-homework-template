const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('database connect sucsess');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
