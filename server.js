const mongoose = require('mongoose');
const app = require('./app');

const { DB_HOST, PORT = 8000 } = process.env;

mongoose.connect(DB_HOST)
 .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch(error => {
    console.log(error.messege);
    process.exit(1)
  })


 