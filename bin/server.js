const app = require('../app');
const dotenv = require('dotenv');
const connectMongo = require('../model/connection');
dotenv.config();

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log('Failed to start application with error: ', error.message);
  }
};

start();
