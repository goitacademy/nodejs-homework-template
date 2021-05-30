const mongoose = require('mongoose');
require('dotenv').config();
const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 5,
});

mongoose.connection.on('connected', () => {
    console.log(`Connection open ${uriDb}`);
})

mongoose.connection.on('error', (e) => {
    console.log(`Error mongoose connection ${e.message}`);
})

mongoose.connection.on('disconnected', () => {
    console.log(`Mongoose disconnected`);
})

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Connected to DB');
        process.exit(1);
    })    
})

module.exports = db;