const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const { DB_HOST, PORT = 3001 } = process.env;
mongoose.set('strictQuery', true);

// const { randomBytes } = require('node:crypto');

// const buf = randomBytes(256);
// console.log('buf: ', buf.toString('hex'));
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
