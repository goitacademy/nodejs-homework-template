// mg9zDJTBLTvL3K2X;
// mongodb+srv://Ivanna:mg9zDJTBLTvL3K2X@cluster0.2cyfzlb.mongodb.net/my-contacts?retryWrites=true&w=majority

import mongoose from 'mongoose';
import app from './app.js';
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
