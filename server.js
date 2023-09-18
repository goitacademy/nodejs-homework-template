const app = require('./app')
const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.JWT_SECRET)

const uriDb = process.env.DB_HOST

const startServer = async () => {
    try {
        const connection = await mongoose.connect(uriDb, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Database connection successful')

        app.listen(3000, () => {
            console.log('Server running. Use our API on port: 3000')
        })
    } catch (error) {
        console.error('Cannot connect to Mongo Database')
        console.error(error)
        process.exit(1)
    }
}

startServer()
