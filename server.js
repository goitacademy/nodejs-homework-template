import app from './app.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const { DB_HOST, PORT } = process.env;
console.log(process.env.JWT_SECRET);

mongoose.connect(DB_HOST)
   .then(() => {
      app.listen(PORT, () => {
         console.log(`Server running. Use our API on port:${PORT}`)
      })
   })
   .catch(error => {
      console.log(error.message);
      process.exit(1);
   });


