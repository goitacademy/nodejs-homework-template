const app = require('./app');
const mongoose = require('mongoose');

const {PORT = 3333, DB_PATH } = process.env;

mongoose.connect(DB_PATH)
    .then(() => {
        app.listen(PORT)
    })
    .then(() => {
        console.log("Database connection successful")
    })
    .catch(error => {
      console.log(error.message);
      process.exit(1)
    })

