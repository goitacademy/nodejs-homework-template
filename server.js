const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log("\x1B[32m Database connection successful");

        app.listen(PORT, () => {
            console.log(
                `\x1B[32m Server running. Use our API on port: \x1B[37m http://localhost:${PORT}`
            );
        });
    })
    .catch(() => {
        console.log("\x1B[31mDatabase connection failed");
        process.exit(1);
    });
