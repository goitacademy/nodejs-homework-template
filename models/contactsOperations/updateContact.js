const fs = require("fs/promises");
const contactsDatabase = require("./dbPath");
const listContacts = require("./listContacts");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updateId = contacts.findIndex((item) => item.id === contactId);

  contacts[updateId] = { id: contactId, ...body };
  await fs.writeFile(contactsDatabase, JSON.stringify(contacts, null, 2));
  return contacts[updateId];
};
module.exports = updateContact;
