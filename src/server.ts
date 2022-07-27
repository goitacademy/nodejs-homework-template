import app from './app';
import mongoose from 'mongoose';

const { DB_HOST, PORT = 9991 } = process.env;

if (!DB_HOST) {
  process.exit(1);
}

const start = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}


start();
