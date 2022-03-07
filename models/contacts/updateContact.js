const updateContacts = require('./updateContacts');
const listContacts = require('./listContacts');

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = { ...contacts[contactIdx], ...body };
  await updateContacts(contacts);
  return contacts[contactIdx]
}

module.exports = updateContact