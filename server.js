import app from './app.js';
import * as dotenv from 'dotenv'; // to get variables from .env
import { connectMongo } from './src/db/connection.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, err => {
      if (err) console.log('error st server launch', err);

      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error ${error.message}`);
  }
};

start();
