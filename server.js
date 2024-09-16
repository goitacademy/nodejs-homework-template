const app = require('./app')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config()
const { DB_HOST, PORT = 4000 } = process.env;

mongoose.connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
