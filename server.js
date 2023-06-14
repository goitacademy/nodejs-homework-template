const app = require('./app')
const mongoose = require('mongoose')

const DB_HOST = 'mongodb+srv://miamarichka:7D7YLLf1GF72gaPR@cluster0.ngyks6g.mongodb.net/db-contacts?retryWrites=true&w=majority'

mongoose.connect(DB_HOST)
  .then(() => app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000")
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

