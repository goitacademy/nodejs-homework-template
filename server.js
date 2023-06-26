const app = require('./app');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

const { DB_HOST } = process.env;

if (typeof process.env.CLOUDINARY_URL === 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
} else {
  console.log('cloudinary config:');
  console.log(cloudinary.config());
}

mongoose.set('strictQuery', true);
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
    console.log('database connect sucsess');
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
