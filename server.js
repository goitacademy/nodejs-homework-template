const mongoose = require('mongoose');

const app = require('./app');

const { DB_URI, PORT } = process.env;

mongoose.set('strictQuery', true);

mongoose
  .connect(DB_URI)
  .then(() => {
    app.listen(PORT);
    console.log(`list ${PORT}`);
    console.log('Database connection successful');
  })
  .catch(e => {
    console.log(e.message);
    process.exit(1);
  });