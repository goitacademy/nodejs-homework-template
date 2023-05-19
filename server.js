const app = require('./app')

const mongoose = require('mongoose');

const DB_HOST = "mongodb+srv://Alex_L:XCp9pKvUzUK0ACU3@cluster0.1fldprw.mongodb.net/contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);
mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000, () => {
    console.log("Database connection successful")
  })
})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})
