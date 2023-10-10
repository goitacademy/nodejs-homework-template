const mongoose = require('mongoose');
require('dotenv').config()

const {LINK} = process.env
const setupMongoConnection = async () => {
    try {

        await mongoose.connect(LINK);
        console.log('Database connection successful');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = setupMongoConnection;