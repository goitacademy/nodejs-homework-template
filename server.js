const app = require('./app');
const { connectMongo } = require('./db/connection');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

const start = async () => {
  try {
    await connectMongo();
    console.log('Database connection successful');
    app.listen(PORT, err => {
      if (err) {
        console.error('Error at a server launch:', err);
      }
      console.log(`Server running. Use our API on port: ${PORT} `);
    });
  } catch (error) {
    console.error(`Failed to lauch application with error: ${error.message}`);
  }
};

start();
