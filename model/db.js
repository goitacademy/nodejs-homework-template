const { MongoClient } = require('mongodb');
require('dotenv').config();

const uriDb = process.env.URI_DB;


const db = MongoClient.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 5,
});

process.on('SIGINT', async () => {
  const client = await db;
  client.close();
  console.log('Connection to DB closed and app terminated');
  process.exit(1);
});

module.exports = db;

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
