const fs = require('fs').promises;
const listContacts = require('./listContacts');
const contactsPath = require('./contactPath');

const removeContact = async contactId => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(item => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  console.log('Контакт удален');
  return contacts;
};
module.exports = removeContact;
