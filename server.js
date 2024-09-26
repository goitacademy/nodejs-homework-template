import  app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const {DB_HOST} = process.env;
const LocalHostNumber=5000;

mongoose.connect(DB_HOST)
.then(()=>app.listen(LocalHostNumber, () => {
  console.log(`Server running. Use our API on port: ${LocalHostNumber}`)
}))
.catch(error=>console.log(error.message));

