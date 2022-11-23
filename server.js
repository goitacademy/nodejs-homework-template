require('dotenv').config();
const app = require('./app');
const { connect } = require('mongoose');

const { MONGO_URL: url, PORT = 3000 } = process.env;

const start = async () => {
  try {
    await connect(url);
    console.log('Database connection successfully');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    });
  } catch (error) {
    console.error(
      `Failed to launch application with error: ${error.message}`
    );
    process.exit(1);
  };
};

start();

