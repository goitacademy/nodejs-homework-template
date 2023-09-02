const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

function run(uri) {
    try {
        mongoose.connect(uri)
        console.log("Database connection seccessful")
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

run(DB_URI)