const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://woopina:woopina@lukaszc97.pac3bth.mongodb.net/db-contacts',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
