const DB = require("../db");
const db = new DB("contacts.json");

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const contact = contacts.splice(index, 1);
  await db.write(contacts);
  return contact;
};

module.exports = removeContact;
