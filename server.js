/* eslint-disable linebreak-style */
const app = require('./app');

const PORT = process.env.PORT || 3000;

const {mongoConnect} = require('./models/connection');

const start = async () => {
  try {
    await mongoConnect();

    app.listen(PORT, () => {
      console.log('Database connection successful');
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Server not running. Error: ${error.message}`);
    process.exit(1);
  }
};

start();
