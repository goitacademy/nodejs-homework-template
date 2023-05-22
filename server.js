const mongoose = require('mongoose');
const app = require('./app');
const {DB_HOST} = process.env;

async function connectToDatabase() {
    try {
      await mongoose.connect(DB_HOST);
      app.listen(3000, () => {
        console.log('Database connection successful');
      });
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
}
  
connectToDatabase();