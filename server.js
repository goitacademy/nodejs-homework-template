const mongoose = require('mongoose');
require('dotenv').config();

const { app } = require('./app');

const { PORT = 3000,HOST_DB } = process.env;

async function main() {
  try {
    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");
    await app.listen(PORT);
    console.log(`Server is on ${PORT}`);
  } catch(err) {
    console.error("Error:", err.message);
  }
}
main();
