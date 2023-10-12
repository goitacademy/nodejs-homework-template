const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require("dotenv").config();
const DB_HOST = process.env.DB_HOST;

const conection = mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = conection;