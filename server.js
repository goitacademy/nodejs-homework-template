const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST =
    'mongodb+srv://Olejan:EKeJOWy1Ek8r3PFW@cluster0.3c75ksb.mongodb.net/db-contacts?retryWrites=true&w=majority';
const PORT = 3000;

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
        console.log('Database connection successful!');
    })
    .catch(err => {
        console.log(err.message);
        process.exit(1);
    });
