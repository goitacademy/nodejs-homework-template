import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import mongoose from 'mongoose';
import app from './app.js';
const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION);
    console.log('Database connection successful');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
