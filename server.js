const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

const DB_HOST = process.env.DB_HOST;

mongoose.set("strictQuery", true);
mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(3000, () => {
            console.log("Server running. Use our API on port: 3000");
        });
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.log(err.message);
        process.exit(1);
    });