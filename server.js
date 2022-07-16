const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const { connectMongo } = require('./models/connection');
require('dotenv').config();

const start = async () => {
  try {
    await connectMongo();
    console.log('Database connection successful');
    app.listen(PORT, (err) => {
      if (err) console.error('Error at server launch:', err);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (err) {
    console.error(`Failed to launch application with error ${err.message}`);
    process.exit(1);
  }
};
start();
