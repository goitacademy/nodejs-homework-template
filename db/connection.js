const path = require("path");

const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "../.env") });

async function main() {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "db-contacts" });
}

module.exports = { main };
