const mongoose = require("mongoose");

const app = require('./app');

const { DB_HOST } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log("Database connection successful");
  })  
  .catch(error => {
    console.log(`Database connection failed. Error message: ${error.message}`);
    process.exit(1);
  })
