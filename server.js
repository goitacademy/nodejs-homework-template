import mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app.js';

// ##################################

// test-user
// x3gdBpkiQUbAUuo8

dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
