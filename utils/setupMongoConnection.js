const mongoose = require('mongoose');
const { MONGO_DB_USER, MONGO_DB_PASSWORD, MONGO_DB_HOST, MONGO_DB_DATABASE } = require('../constants/env');

const setupMongoConnection = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_HOST}/${MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
        );

        console.log('Database connection successful');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

module.exports = setupMongoConnection;