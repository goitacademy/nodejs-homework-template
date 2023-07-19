import mongoose from 'mongoose';

import app from './app.js';

const DB_HOST =
  'mongodb+srv://aannakravets:QZqEdhvM5qtR60bR@cluster1.qcldh5t.mongodb.net/db-contacts';

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
