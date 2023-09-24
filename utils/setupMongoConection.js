const mongoose = require('mongoose');

const {MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE} = require('../evn')

const setupConnection = async () =>{
    try {
        const res = await mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`)
        console.log("Database connection successful")
    } catch (error) {
        console.error(error);
        process.exit(1)
    }
}

module.exports = setupConnection