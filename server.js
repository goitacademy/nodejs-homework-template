import mongoose from 'mongoose';
// import dotenv from 'dotenv';
import 'dotenv/config';
import { exit } from 'node:process';
import app from './app.js';

// ##################################

// dotenv.config();
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connection successful. Server running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error.message);
    exit(1);
  });
