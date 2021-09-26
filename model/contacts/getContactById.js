const listContacts = require('./listContacts');

async function getContactById(contactId) {
  const allContacts = await listContacts();
  // console.log(allContacts);
  const idx = allContacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  return allContacts[idx];
}

module.exports = getContactById;
