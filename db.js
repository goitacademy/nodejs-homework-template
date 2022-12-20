const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
require('dotenv').config()

mongoose.connect(process.env.DB_HOST)
    .then(() => console.log('Database connection successful'))
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });

module.exports = mongoose;