const mongoose = require('mongoose')

const {MONGO_DB_URL} = process.env

const connection = mongoose.connect(MONGO_DB_URL, {dbName: 'db-contacts'})
.then(()=>console.log("Database connection successful"))
.catch((error)=>{
    console.log(error.message)
    process.exit(1)
})

module.exports = connection;