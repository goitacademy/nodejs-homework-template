const app = require('./app')
require('dotenv').config()

const { connectMongo } = require('./db/connection');

const PORT = process.env.DEV_PORT || 3000;

const start = async () => {
    try {
      await connectMongo();
      console.log('Database connection successful');

      app.listen(PORT, () => {
        console.log("Server running. Use our API on port: 3000")
      })
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
}

start();
