const { connect, connection } = require('mongoose');

const uri = process.env.DB_HOST;
const options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 20, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

const connectDB = async () => {
  try {
    connect(uri, options);
    connection.on('connected', () => {
      console.log({
        type: 'info',
        msg: 'connected',
        service: 'mongoDB',
      });
    });
    connection.on('err', err => {
      console.log({
        type: 'error',
        msg: err.message,
        service: 'mongoDB',
      });
    });
    connection.on('disconnected', () => {
      console.log({
        type: 'info',
        msg: 'disconnected',
        service: 'mongoDB',
      });
    });
    process.on('SIGINT', async () => {
      connection.close();
      console.log('Connection mongoDB closed');
      process.exit(1);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
