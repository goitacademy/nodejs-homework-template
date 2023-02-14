import app from './app';
import dotenv from 'dotenv';
import { connectToDatabase } from 'db/connection';

dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;
const DB_URI = process.env.DB_URI!;

const start = async () => {
  try {
    await connectToDatabase(DB_URI);
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error: ${(err as Error).message}`);
    process.exit(1);
  }
};

start();
