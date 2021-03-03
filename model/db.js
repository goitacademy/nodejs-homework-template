const { MongoClient } = require('mongodb');
require('dotenv').config();
const uriDb = process.env.DB_HOST;

const db = MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Connection for db closed and app termination');
  process.exit(1);
});

module.exports = db;
