const mongoose = require('mongoose')
require('dotenv').config()
 
const uriDb =process.env.URI_DB
 

const db = mongoose.connect(uriDb, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    poolSize: 5,
 });

 mongoose.connection.on('error', (err) => {
    console.log(`Mondoose error: ${err.message}`)
 })

 mongoose.connection.on('disconnected', () => {
    console.log(`Mondoose disconnected`)
 })

 process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
    console.log("Database disconnection successful")
     process.exit(1)    
    })
     
 })

module.exports = db