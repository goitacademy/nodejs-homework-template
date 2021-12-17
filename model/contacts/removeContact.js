const fs = require('fs/promises');
const readContent = require('./readContent');
const contactsPath = require('./contactsPath');

const removeContact = async contactId => {
  const contacts = await readContent();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return removedContact;
};

module.exports = removeContact;
