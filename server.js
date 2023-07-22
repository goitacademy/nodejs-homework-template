const mongoose = require("mongoose");
const app = require("./app");

const { DB_HOST, PORT = 5500 } = process.env;

console.log(PORT);

mongoose
    .connect(DB_HOST)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server running. Use our API on port", PORT);
        });
        console.log("DataBase connection successful");
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
