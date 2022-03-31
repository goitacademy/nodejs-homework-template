const fs = require("fs/promises");
const path = require("path");

const listContacts = require("./listContacts");
const contactsPath = path.join(__dirname, "../../db/db.js");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts.listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  }
  return null;
};

module.exports = {
  updateContact,
};
