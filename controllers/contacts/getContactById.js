const DB = require("../../db/db");
const db = new DB("../models/contacts.json");

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

module.exports = {
  getContactById,
};
