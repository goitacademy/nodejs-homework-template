const { MongoClient } = require('mongodb');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = MongoClient.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 15,
});

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Disconnect MongoDB');
  process.exit();
});

module.exports = db;
