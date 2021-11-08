const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST;

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT);
    })
    .catch((error) => {
        console.log("error", error);
        process.exit(1);
    });
