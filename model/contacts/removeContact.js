const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContacts');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  contactId = String(contactId)
  const idx = contacts.findIndex(i => i.id === contactId);
  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);
  return contacts[idx];
}

module.exports = removeContact;