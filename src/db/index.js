const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(
  path.join(__dirname, "..", "..", "model", "contacts.json")
);

const db = low(adapter);
console.log(db);

db.defaults({
  contacts: [],
}).write();

module.exports = db;
