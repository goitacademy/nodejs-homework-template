const mongoose = require("mongoose");

const app = require('./app')

const DB_HOST = "mongodb+srv://Sergiy:RELDvJmfjGp9JmGe@cluster0.h5t5ehl.mongodb.net/contacts_book?retryWrites=true&w=majority"
const PORT = 3000;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => {
    console.log("Database connection successful")
  }))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });




