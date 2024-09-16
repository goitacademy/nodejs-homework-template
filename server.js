import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();


const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

const start = async () => {
  try {
    await mongoose.set('strictQuery', false);
    await mongoose
      .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('start'));
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

start();

