const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("Database connection successful");

        app.listen(PORT, () => {
            console.log(
                `Server running. Use our API on port: http://localhost:${PORT}`
            );
        });
    })
    .catch(() => {
        console.log("Database connection failed");
        process.exit(1);
    });