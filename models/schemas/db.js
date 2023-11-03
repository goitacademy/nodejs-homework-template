const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
});

mongoose.connection.on('connected', () => {
    console.log('Database connection successful');
});

mongoose.connection.on('error', err => {
    console.log(`Database connection error db: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Database connection disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed and app terminated');
    process.exit(1);
});

module.exports = db;