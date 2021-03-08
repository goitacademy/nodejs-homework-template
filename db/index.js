const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(
  path.join(__dirname, "..", "data", "contacts.json")
);
const db = low(adapter);

// Set some defaults
db.defaults({ contacts: [] }).write();

module.exports = db;
