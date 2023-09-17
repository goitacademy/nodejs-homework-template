const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()

const uriDb = process.env.DB_HOST

const startServer = async () => {
    try {
        await mongoose.connect(uriDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connection successful')

        // Usunięto app.listen stąd, ponieważ jest już w app.js
    } catch (error) {
        console.error('Cannot connect to Mongo Database')
        console.error(error)
        process.exit(1)
    }
}

startServer()
