const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsDatabase = require("./dbPath");

const removeContact = async (contactId) => {
  const sourceContacts = await listContacts();
  const newContacts = sourceContacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsDatabase, JSON.stringify(newContacts), "utf8");
  return sourceContacts.filter((contact) => contact.id === contactId);
};

module.exports = removeContact;
