
const mongoose = require('mongoose');
require('dotenv').config()
const uri = process.env.URI_DB;

const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection to db')
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err.message}`)
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Connection for db closed and app termination')
    process.exit(1)
})


module.exports = db