const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5,
})

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('button "C" was pressed and connection are terminated')
  process.exit(1)
})

module.exports = db
