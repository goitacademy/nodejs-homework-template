const app = require('./app')

// hw3 ----
// bR5ojK7bFN88iDUW
const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://Oksana:bR5ojK7bFN88iDUW@cluster0.oglybn2.mongodb.net/contacts?retryWrites=true&w=majority";

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
