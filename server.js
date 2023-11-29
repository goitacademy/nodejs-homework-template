
const mongoose = require('mongoose')


const app = require('./app')

const DB_HOST = require('./config')

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successfull");
    })
  })
  .catch(error =>{
    console.log(error.message);
    process.exit(1);
})

//Q9rDFYMcFH4QN7Md

