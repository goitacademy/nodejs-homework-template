import mongoose from 'mongoose';

import app from './app.js';

// gHd87goCBDZVwG5H

// const DB_HOST =
//   'mongodb+srv://Taras:gHd87goCBDZVwG5H@cluster0.td0ighl.mongodb.net/my-contacts?retryWrites=true&w=majority';

// mongoose
//   .connect(DB_HOST)
//   .then(() => {

//   })
//   .catch((error) => {
//     console.log(error.message);
//     process.exit(1);
//   });

app.listen(3000, () => {
  console.log('Server running. Use our API on port: 3000');
});
