const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

module.exports = getContactById;