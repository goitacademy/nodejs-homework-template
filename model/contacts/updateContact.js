const path = require("path");
const readContacts = require("./readContacts");
const writeContacts = require("./writeContacts");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContact = async (contactId, body) => {
  const contacts = await readContacts(contactsPath);
  const contactToUpdate = contacts.find((contact) => contact.id === contactId);

  if (contactToUpdate) {
    Object.assign(contactToUpdate, body);
    await writeContacts(contactsPath, contacts);
  }

  return contactToUpdate;
};

module.exports = { updateContact };
