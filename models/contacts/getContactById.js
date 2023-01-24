const getContacts = require('./getContacts');

async function getContactById(contactId) {
  const contacts = await getContacts();
  if (!contacts) return null;

  const contact = contacts.find(contact => contact.id === contactId);
  return contact || null;
}

module.exports = getContactById;
