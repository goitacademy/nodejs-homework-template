import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = client.connect()

process.on('SIGINT', async () => {
  const client = await db
  client.close()
  console.log('Connection DB closed')
})
export default db
