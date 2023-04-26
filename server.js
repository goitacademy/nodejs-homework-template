const app = require('./app');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose
    .connect(uriDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connection successful'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

connection
    .then(() => {
        app.listen(PORT, function () {
            const url = `http://localhost:${PORT}`;
            console.log(`Server running. Use our API on ${url}`);
        });
    })
    .catch(err =>
        console.log(`Server not running. Error message: ${err.message}`)
    );
