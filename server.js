const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.example' });

const { DB_HOST } = process.env;

if (!DB_HOST) {
  console.error('DB_HOST is not defined. Please provide the MongoDB URI.');
  process.exit(1);
}

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(3000);
    console.log('Database connection successful');
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  });
