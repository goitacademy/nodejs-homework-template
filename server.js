const app = require('./app'); 
const mongoose = require('mongoose');
const logger = require('morgan');

const dotenv = require('dotenv')
dotenv.config()

const { DB_HOST, PORT = 3000 } = process.env;

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  }
  )
  .catch(error => {
    console.log(error.message);
    process.exit(1); 
  })

