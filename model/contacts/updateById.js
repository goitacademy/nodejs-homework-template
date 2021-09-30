const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const contactId = contacts.findIndex(contact => contact.id === id);
  if (contactId === -1) {
    return null;
  }
  contacts[contactId] = { ...contacts[contactId], ...data };
  await updateContacts(contacts);
  return contacts[contactId];
};

module.exports = updateById;
