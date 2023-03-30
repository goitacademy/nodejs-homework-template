const mongoose = require("mongoose");

const dbPath = process.env.MONGO_SECRET;

    const connectDatabase= async ()=> {
        await mongoose
            .connect(dbPath)
            .then(() => console.log("Database connection successful..."))
            .catch((err) => console.log(`Server not running. Error message: ${err.message}`));
            process.exit(1);
};
module.exports = { connectDatabase };