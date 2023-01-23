require('dotenv').config();
const app = require('./app');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
// mongoose.set('debug', true);

const { HOST_URI, PORT } = process.env;

(async function () {
  try {
    await mongoose.connect(HOST_URI);
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error('Error while connecting to mongodb', error.message);
    process.exit(1);
  }
})();
