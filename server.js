const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`SERVER RUNNING ON PORT ${PORT}, DB_CONNECTED`);
  })
  .catch(error => {
    console.log(DB_HOST);
    console.log('DB_ERROR', error.message);
    process.exit(1);
  });
