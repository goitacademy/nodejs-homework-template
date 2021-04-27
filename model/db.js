const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 5,
})

mongoose.connection.on('connected', (error) => {
    console.log('Database connection successful');
})

mongoose.connection.on('error', (error) => {
    console.log(`Mongoose error: ${error.message}`);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
})

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Database connection closed');
        process.exit(1)
    })
})

module.exports = db