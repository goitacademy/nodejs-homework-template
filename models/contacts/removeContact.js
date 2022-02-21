const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

const listContacts = require("./listContacts");

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removeContact = allContacts.find((item) => item.id === contactId);
  const newListContacts = allContacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
  return removeContact;
};

module.exports = removeContact;
