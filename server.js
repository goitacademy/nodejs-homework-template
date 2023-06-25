const app = require('./app')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();

const uriDb = process.env.DB_HOST

const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection
  .then(() => {
    app.listen(3000, function() {
      console.log("Server running. Use our API on port: 3000")
      console.log("Database connection successful")
    })
  })
  .catch(err => {
    console.log(`Server not running. Error message: ${err.message}`),
    process.exit(1)
  });