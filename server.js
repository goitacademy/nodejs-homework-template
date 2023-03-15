const app = require('./app')

const mongoose = require('mongoose');


const url = 'mongodb+srv://mirzakhanovamari:testcluster@cluster0.icwx1gn.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(url)
  .then(() => {
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
    });
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });




