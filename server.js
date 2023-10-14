require('dotenv').config();

const mongoose = require('mongoose');

const app = require("./app.js");

//  U1XmmpMOEwO9HXnj

const DB_HOST = process.env.DB_HOST;

mongoose.connect(DB_HOST)
.then(() => 
  {
  app.listen(3000)
})
.catch(error => {
  console.log(error.message);
  process.exit(1)
})
