const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectMongo = async () => {
    await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
    connectMongo
}