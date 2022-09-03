const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContacts');

const updateContact = async (contactId, contactData) => {
  const contacts = await listContacts();
  contactId = String(contactId)
  const idx = contacts.findIndex(i => i.id === contactId);
  if (idx === -1) {
    return null;
  }

  contacts[idx] = { id: contactId, ...contactData }
  await updateContacts(contacts);
  return contacts[idx];
}

module.exports = updateContact;