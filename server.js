require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
// mongoose.set("debug", true); // enable logging

const { HOST_URI } = process.env;
PORT = process.env.PORT || 3000;
const app = require('./app');

async function main() {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Mongodb connection successful!');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
