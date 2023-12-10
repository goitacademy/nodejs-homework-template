const app = require('./app')
const mongoose = require("mongoose");


// mongoose

// connect URL with password and database name see below!
const { DB_HOST, PORT } = process.env;

// close message about new version mongoose 'strictQuery' = false. 
// set this variable to true by hand easy
mongoose.set('strictQuery', true);

// infirst connect to DB and only later, if all right, start server
mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Data connect success');
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000")
    })})
  .catch(error => {
    console.log(error.message);

    // close all running process. Parameter '1' - mean close with unknown error.
    process.exit(1);
  });
// mongoose

