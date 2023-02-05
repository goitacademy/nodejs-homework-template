const DB = require("../db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

module.exports = listContacts;
