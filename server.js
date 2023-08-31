//import { app } from './app.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { makeApp } from './app.js';
import { controllerMongoDB } from './controllers/mongoDB.controller.js';

config();

const uriDb = 'mongodb+srv://krozbicki:GOIT2023@cluster0.qe16opn.mongodb.net/db-contacts';
const port = 3000;
const server = 'http://localhost';

export const serverAddress = `${server}:${port}`;

export const startServer = async () => {
  try {
    const connection = await mongoose.connect(uriDb);
    // console.log('Database connection successful');

    const app = await makeApp(controllerMongoDB);
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
