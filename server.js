const app = require('./app')
const mongoose = require('mongoose');
const { DB_HOST } = process.env;
// const { error } = require('./schemas/contacts-schema');

mongoose.connect(DB_HOST)
  .then(() => { app.listen(3000); console.log("localhost3000") })
  .catch(error => console.log(error.error))

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

console.log(process.env)
