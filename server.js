const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log('Database connection successful');
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch(error => {
        console.log(error);
        process.exit(1);
    });
