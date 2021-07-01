const { MongoClient } = require('mongodb')
require('dotenv').config()

const uriDb = process.env.URI_DB

// eslint-disable-next-line new-cap
const db = new MongoClient.connect(uriDb, { useNewUrlParser: true, poolSize: 5 })

process.on('SIGINT', async() => {
  const client = await db
  client.close()
  process.exit()
})
// eslint-disable-next-line no-undef
module.exports = db
