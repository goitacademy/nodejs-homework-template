const mongoose = require('mongoose');

const app = require('./app')

const { DB_HOST } = process.env;

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3001)
    console.log("Database connection successful")
  }).
  catch((error) =>
  {
    console.log(error.message);
    process.exit(1)
  })

  // mongoose.set( 'strict Query', true) 


