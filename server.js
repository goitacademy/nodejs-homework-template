require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app')


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const connectMongo = async () => {

    mongoose.set("strictQuery", false);
    return mongoose.connect(MONGO_URL);
};


const start = async () => {
    await connectMongo();

    app.listen(PORT, (err) => {
        if (err) {
            console.error('Error at server launch:', err);
        }
        console.log(`Server running. Use our API on port: ${PORT}`)
    })
};

start()
    .then(console.log)
    .catch(console.error)


