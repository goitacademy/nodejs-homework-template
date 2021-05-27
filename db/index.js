const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = new MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5
})

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Connection for DB is disconnected and app terminated')
  process.exit()
})

module.exports = db
