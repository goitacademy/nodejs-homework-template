const app = require('./app');
require('dotenv').config();
const { mongoConnect } = require('./services/mongoConnect');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      console.log('Database connection successful');
    });
  } catch (err) {
    console.log(`Error message: ${err.message}`);
    process.exit(1);
  }
};

start();
