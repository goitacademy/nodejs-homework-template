const DB = require("../db");
const db = new DB("contacts.json");

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await db.write(contacts);
  return contacts[index];
};

module.exports = updateContact;
