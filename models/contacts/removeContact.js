const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(contact => {
    return contact.id === contactId
  });
  if (contactIdx === -1) {
    return null
  }
  
  const [removedContact] = contacts.splice(contactIdx, 1);
  await updateContacts(contacts);
  return removedContact;
}

module.exports = removeContact;