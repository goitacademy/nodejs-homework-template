const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })


// hw3 ----
// bR5ojK7bFN88iDUW
const mongoose = require("mongoose");

const {DB_HOST} = require('./config');

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
.then(() => {
  // app.listen(3000)
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
})
.catch(error => {
  console.log(error.message)
  process.exit(1);
})



// --------hw3
