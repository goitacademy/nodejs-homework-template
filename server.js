//const app = require('./app')
import mongoose from 'mongoose';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const {DB_HOST, PORT} = process.env;

mongoose.connect(DB_HOST)
.then(() => {
  app.listen(3000, () => {
  //console.log(`Server running. Use our API on port: ${PORT}`)
  console.log('"Database connection successful"')
})
})
.catch(error => {
  console.log(error.message);
  procces.exit(1);
})


