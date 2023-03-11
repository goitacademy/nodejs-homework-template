require('dotenv').config();
const app = require('./src/app');
const { connectMongo } = require('./src/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectMongo();
    app.listen(PORT, () => console.log('Database connection successful'));
  } catch (error) {
    console.error(`Failed to connect to MongoDB. Error: ${error.message}`);
    process.exit(1);
  }
}

startServer();
