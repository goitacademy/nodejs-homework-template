require('dotenv').config();
const { connection } = require('./src/db/connection');
const app = require('./app');

const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connection();

    app.listen(PORT, err => {
      if (err) console.error('Error at a server launch:', err);
      console.log('Database connection successful');
    });
  } catch (error) {
    console.error(`Failed to launch application with error: ${error.message}`);
    process.exit(1);
  }
};

start();