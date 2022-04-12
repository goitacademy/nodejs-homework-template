const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const uri = process.env.URI_DB

const db = MongoClient.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1 
})

process.on('SIGINT', async() => {
    const client = await db 
    client.close()
    console.log('Disconnected from DB')
    process.exit(1)
})

module.exports = db
