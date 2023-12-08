const app = require('./app')
const mongoose = require("mongoose");


// mongoose

// connect URL with password and database name see below!
const DB_HOST = 'mongodb+srv://DmShko:dJGaCghPxkWILTZg@cluster0.x8nxlz3.mongodb.net/db-contacts';

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Data connect success');
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    })})
  .catch(error => {
    console.log(error.message);

    // close all running process. Parametr '1' - mean close with unknown error.
    process.exit(1);
  });
// mongoose

