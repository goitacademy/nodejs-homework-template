const mongoose = require("mongoose");
const DB_HOST = process.env.DB_HOST;
async function conectMongo() {
  return mongoose.connect(DB_HOST, { dbName: "db-contacts" });
}
module.exports = {
  conectMongo,
};
