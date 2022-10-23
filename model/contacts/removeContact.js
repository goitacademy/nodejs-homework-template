const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContacts');

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  contactId = String(contactId)
  const idx = contacts.findIndex(i => i.id === contactId);
  if (idx === -1) {
    return null;
  }

  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = removeContact;