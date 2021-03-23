const { MongoClient } = require('mongodb')
require('dotenv').config()

const urlDb = process.env.URL_DB

const db = MongoClient.connect(urlDb, {
  useUnifiedTopology: true,
  poolSize: 5
})

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Connection for db closed and app terminated')
  process.exit(1)
})

module.exports = db
