const mongoose = require('mongoose');
const app = require('./app');

mongoose.set('strictQuery', false);

// connection to Mongoose DB
const { DB_HOST, PORT = 3006 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log(`Database connection successful use API on PORT: ${PORT}`)
  }))
    .catch(error => {
      console.log(`Server not running. Error message: ${error.message}`);
      process.exit(1);
  })

  