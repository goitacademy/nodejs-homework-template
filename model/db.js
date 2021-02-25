const { MongoClient } = require('mongodb')
require('dotenv').config()

const uriDb = process.env.DB_HOST

const db = new MongoClient(uriDb, {
  useUnifiedTopology: true,
}).connect()

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Connection...')
  process.exit(1)
})

module.exports = db
