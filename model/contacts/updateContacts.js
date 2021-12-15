const listContacts = require('./listContacts');
const contactPath = require('./contactPath');
const fs = require('fs/promises');

const updateContacts = async (contactId, { id, name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = updateContacts;
