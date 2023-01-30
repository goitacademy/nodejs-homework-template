const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const connectMongo = async () => {
    return mongoose.connect(process.env.DB_HOST)
};

module.exports = {
    connectMongo,
}
