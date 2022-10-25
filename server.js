const app = require('./app');
const mongoose = require('mongoose');

// console.log(process.env);
// const { DB_HOST, PORT = 3000} = require('./config');

const { DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Server running on port: 3000");
    console.log("Database connected successful!");
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
