const MongoClient = require('mongodb').MongoClient

const mongoUrl = process.env.DB_HOST

const connectMongo = async () => {
  const client = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  })
  const db = client.db()
  return await db.collection('contacts')
}
module.exports = {
  connectMongo,
}
