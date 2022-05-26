const listContacts = require('./listContacts');
const updateContactsDB = require('./updateContactsDB');

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContactsDB(newContacts);
  return contacts[idx];
};

module.exports = removeContact;
