const listContacts = require('./listContacts');

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = contacts.findIndex(contact => contact.id === id);
  if (contactId === -1) {
    return null;
  }
  return contacts[contactId];
};

module.exports = getContactById;
