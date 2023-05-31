const app = require('./app');

const mongoose = require("mongoose");

const DB_HOST = "mongodb+srv://MariiaPetrukhnova:xWc1ThchFWLBtgY4@cluster0.ka3so42.mongodb.net/contacts-book?retryWrites=true&w=majority";

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful")
    })
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });    



