const fs = require('fs/promises');
const listContacts = require('./listContacts');
const contactsPath = require('./contactsPath');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexDeletedContact = contacts.findIndex(
      (contact) => contact.id === contactId,
  );
  if (indexDeletedContact === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(indexDeletedContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
};

module.exports = removeContact;
