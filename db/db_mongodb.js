require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.URI_DB;

const db = MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

process.on('SIGINT', async () => {
  console.log('Disconnecting from database...');
  const client = await db;
  await client.close();
  process.exit(1);
});

module.exports = db;
