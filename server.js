const mongoose = require('mongoose');

const app = require('./app');

const { DB_HOST, PORT = 5000 } = process.env;

mongoose.set('strictQuery', true);

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is running... Use API on port: 5000');
        });
    })
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
