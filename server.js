const app = require('./app');
const mongoose = require('mongoose');
const { serverConfig } = require('./configs');

const { PORT, DB_URI } = serverConfig;

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log('"Database connection successful"');
        app.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch(e => {
        console.log(`Server not running. Error message: ${e.message}`)
        process.exit(1);
    });
