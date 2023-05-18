const mongoose = require('mongoose');

const app = require('./app')

const DB_HOST = `mongodb+srv://markiz:8QSA4AED2b6Jb1F2@cluster0.6nthpzn.mongodb.net/db-contacts?retryWrites=true&w=majority`;

mongoose.set("strictQuery", true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(6666);
    console.log("Database connection successful");
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1);
  });
