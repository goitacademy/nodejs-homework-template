import app from "./app.js";
import mongoose from 'mongoose';


const DB_HOST = process.env.DB_HOST;

// mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Database connection error:', error.message);
    process.exit(1);
  });
