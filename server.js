const app = require('./app');
require('dotenv').config();
const { mongoConnect } = require('./services/mongoConnect');

const start = async () => {
  try {
    await mongoConnect();
    app.listen(3000, () => {
      console.log('Database connection successful');
    });
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  }
};

start();
