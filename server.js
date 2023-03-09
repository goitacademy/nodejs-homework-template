import mongoose from 'mongoose';
import app from './app.js';
import * as dotenv from 'dotenv';

dotenv.config()

const DB_URI = process.env.DB_URI;
const DB_PORT = process.env.DB_PORT;

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Database connection successful');
    app.listen(DB_PORT, () => {
      console.log(`Server is running on port ${DB_PORT}`)
    })
  })
  .catch(err => {
    console.error('Error:', err.message);
    //process.exit(1);   
  })    

