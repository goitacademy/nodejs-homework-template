const fs = require('fs/promises');
const path = require('path');

const listContacts = require('./listContacts');
const contactsPath = path.join(__dirname, './contacts.json');

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  };
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.export = removeContact;
