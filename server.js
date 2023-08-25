import { app } from './app.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const uriDb = process.env.DB_HOST;
const port = process.env.PORT;
const server = process.env.SERVER;
export const serverAddress = `${server}:${port}`;

const startServer = async () => {
  try {
    const connection = await mongoose.connect(uriDb);
    // console.log('Database connection successful');

    app.listen(port, () => {
      // console.log(`Server running. Use our API on server: ${serverAddress}`);
    });
  } catch (error) {
    console.error('Cannot connect to Mongo Database');
    console.error(error);
    process.exit(1);
  }
};

startServer();
