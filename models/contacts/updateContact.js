const fs = require('fs/promises');
const getContacts = require('./getContacts');
const contactsPath = require('./contactsPath');

async function updateContact(contactId, requestBody) {
  const contacts = await getContacts();
  if (!contacts) return null;

  const contactToUpdateIndex = contacts.findIndex(
    contact => contact.id === contactId
  );

  if (contactToUpdateIndex === -1) {
    return null;
  }

  contacts[contactToUpdateIndex] = {
    ...contacts[contactToUpdateIndex],
    ...requestBody,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactToUpdateIndex];
}

module.exports = updateContact;
