import app from '../app';
import dotenv from 'dotenv';
import {connectMongo} from '../model';
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error : any | undefined) {
    console.log('Failed to start application with error: ', error.message);
  }
};

start();
