const fs = require('fs/promises');
const contactsPath = require('./contactsPath');
const listContacts = require('./listContacts');

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexUpdatedContact = contacts.findIndex(
      (contact) => contact.id === contactId,
  );
  if (indexUpdatedContact === -1) {
    return null;
  }
  contacts[indexUpdatedContact] = {...contacts[indexUpdatedContact], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[indexUpdatedContact];
};

module.exports = updateContact;
