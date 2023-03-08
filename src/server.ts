import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from 'db/connection';

dotenv.config();

const { SERVER_PORT = 8001, DB_URI } = process.env;

const start = async () => {
  try {
    await connectToDatabase(DB_URI!);
    console.log('Database connection successful');

    app.listen(SERVER_PORT, () => {
      console.log(`Server running. Use our API on port: ${SERVER_PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${(err as Error).message}`);
    process.exit(1);
  }
};

start();
