const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

app.listen(3000, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connection successful');
    console.log('Server running. Use our API on port: 3000');
  } catch (error) {
    console.log(`Error message: ${error.message}`);
    process.exit(1);
  }
});
