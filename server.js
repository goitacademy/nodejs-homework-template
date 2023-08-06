const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST = "mongodb+srv://Sergiy:RELDvJmfjGp9JmGe@cluster0.h5t5ehl.mongodb.net/contacts_book?retryWrites=true&w=majority"

mongoose.connect(DB_HOST)
  .then(() => app.listen(3000, () => {
    console.log("Database connection successful")
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });




