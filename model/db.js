const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("./model/contacts.json");
const db = low(adapter);
db.defaults({ contacts: [] }).write();
module.exports = db;
