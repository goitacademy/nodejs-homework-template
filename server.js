const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST =
    'mongodb+srv://Roman:5cndTJ8rojILmu2W@cluster0.bn3ttfy.mongodb.net/contactsbook?retryWrites=true&w=majority';

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(3000);
    })
    .catch(e => {
        console.log('ERROR: ', e.message);
        process.exit(1);
    });
