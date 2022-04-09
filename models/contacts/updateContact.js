const DB = require("../../db/db.js");
const db = new DB("contacts.json");

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = updateContact;
