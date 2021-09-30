const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactId = contacts.findIndex(contact => contact.id === id);
  if (contactId === -1) {
    return null;
  }
  contacts.splice(contactId, 1);
  await updateContacts(contacts);
  return true;
};

module.exports = removeContact;
