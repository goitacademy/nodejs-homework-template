import { app } from './app.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const uriDb = process.env.DB_HOST;

const startServer = async () => {
  try {
    const connection = await mongoose.connect(uriDb);
    console.log('Database connection successful');

    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (error) {
    console.error('Cannot connect to Mongo Database');
    console.error(error);
    process.exit(1);
  }
};

startServer();
