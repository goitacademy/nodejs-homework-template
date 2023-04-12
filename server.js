const app = require('./app')
const mongoose = require('mongoose');
const { DB_HOST} = process.env;
// const { error } = require('./schemas/contacts-schema');


// "mongodb+srv://Yelena:ovgefv00u1pmKzFv@cluster0.v5d08lr.mongodb.net/contacts-database?retryWrites=true&w=majority"


mongoose.connect(DB_HOST)
  .then(() => { app.listen(3000) })
  .catch(error => console.log(error.message))

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })


