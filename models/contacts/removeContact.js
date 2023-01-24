const fs = require('fs/promises');
const getContacts = require('./getContacts');
const contactsPath = require('./contactsPath');

async function removeContact(contactId) {
  const contacts = await getContacts();
  if (!contacts) return null;

  const contactToDeleteIndex = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (contactToDeleteIndex === -1) {
    return null;
  }

  const deletedContact = contacts.splice(contactToDeleteIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return deletedContact;
}

module.exports = removeContact;
