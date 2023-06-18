const mongoose = require('mongoose')

const {DB_HOST} = require("./config")

const app = require('./app')

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(()=> {
    app.listen(3000)
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })


