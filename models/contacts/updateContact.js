const fs = require("fs/promises");

const contactsPath = require("./contactsPath");

const listContacts = require("./listContacts");

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    allContacts[index] = { ...allContacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[index];
  }
  return null;
};

module.exports = updateContact;
