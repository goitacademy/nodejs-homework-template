const DB = require("../../db/db");
const db = new DB("../models/contacts.json");

const listContacts = async () => {
  return await db.read();
};

module.exports = {
  listContacts,
};
