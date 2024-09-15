const DB = require("../db");
const db = new DB("contacts.json");

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

module.exports = getContactById;
