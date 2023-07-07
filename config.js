// const mongoose = require("mongoose");

const DB_HOST = process.env.DB_HOST;

// const DB_HOST = "mongodb+srv://CuzImBatman:xpvNGJnyeMDGzVwg@cluster0.vosysd9.mongodb.net/db-contacts?retryWrites=true&w=majority"

// async function run() {
//   try {
//     await mongoose.connect("");
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// }

// run().catch(console.error);

module.exports = {DB_HOST,}