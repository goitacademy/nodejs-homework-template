require('dotenv').config();
const app = require('./src/app');
const db = require('./src/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.connectMongo();
    app.listen(PORT, () => console.log('Database connection successful'));
  } catch (error) {
    console.error(`Failed to start server. Error: ${err.message}`);
    process.exit(1);
  }
}

startServer();
