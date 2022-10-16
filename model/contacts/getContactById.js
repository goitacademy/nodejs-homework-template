const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  contactId = String(contactId)
  const result = contacts.find(i => i.id === contactId)
  if (!result) {
    return null;
  }
  return result;
}

module.exports = getContactById