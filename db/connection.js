const MongoClient = require('mongodb').MongoClient
// const mongoose = require("mongoose")


const connectMongo = async () => {
    const client = MongoClient.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    const db = await client.db()

    const Contacts = await db.collection('contacts')
    const contacts = await Contacts.find({}).toArray()
    console.log(contacts)
}

module.exports = connectMongo