const mongoose = require('mongoose');

const app = require('./app')

const { DB_HOST } = process.env;
const { PORT = 3000 } = process.env;

const connection = mongoose.connect(DB_HOST)

connection.then(() => {
  app.listen(PORT, () => {
    console.log(`Database connection successful`)
  });
}).catch(error => {
  console.log(error.message);
  process.exit(1)
});


