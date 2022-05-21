const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsPath = require("../contacts.json");

const removeContact = async (contactId) => {
  const sourceContacts = await listContacts();
  const newContacts = sourceContacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return sourceContacts.filter((contact) => contact.id === contactId);
};

module.exports = removeContact;
