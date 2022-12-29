const mongoose = require('mongoose');
require("dotenv").config();

const app = require('./app')

const { PORT, DB_HOST } = process.env;

app.listen(PORT, () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(DB_HOST, (error)=>{
    if(error) {
      process.exit(1)
    }
    console.log("Database is connected")
  } );
  console.log(`Server running. Use our API on port: ${PORT}`)
})
